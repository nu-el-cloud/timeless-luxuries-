import React, { useState, useEffect } from "react";
import "./Check.css";
import { useNavigate } from "react-router-dom";
import { VscCreditCard } from "react-icons/vsc";

// Helper: extract numeric price from "₦50,000.00"
const parsePrice = (priceStr) => {
  const numStr = priceStr.replace(/[^\d.]/g, "");
  return parseFloat(numStr) || 0;
};

// Helper: format number as NGN currency
const formatNGN = (value) => {
  return value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// DHL Shipping Rates
const DHL_RATES = {
  // Zone 1: UK, Ireland
  "UK": {
    "0-2kg": 61500, "2.5kg": 87000, "3kg": 93800, "3.5kg": 97000,
    "4kg": 102000, "4.5kg": 116500, "5kg": 120500, "5.5-6kg": 139000,
    "6.5-7kg": 152000, "7.5-8kg": 169800, "8.5-9kg": 197000,
    "9.5-10kg": 216500, "above10kg": 21000
  },
  "Ireland": {
    "0-2kg": 61500, "2.5kg": 87000, "3kg": 93800, "3.5kg": 97000,
    "4kg": 102000, "4.5kg": 116500, "5kg": 120500, "5.5-6kg": 139000,
    "6.5-7kg": 152000, "7.5-8kg": 169800, "8.5-9kg": 197000,
    "9.5-10kg": 216500, "above10kg": 21000
  },
  // Zone 2: West African Countries
  "Benin": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Ghana": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Gambia": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Sierra Leone": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Togo": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Liberia": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Mali": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Niger": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  "Cameroon": {
    "0-2kg": 64000, "2.5kg": 82000, "3kg": 96800, "3.5kg": 103000,
    "4kg": 109500, "4.5kg": 118000, "5kg": 128000, "5.5-6kg": 152500,
    "6.5-7kg": 169800, "7.5-8kg": 178000, "8.5-9kg": 191500,
    "9.5-10kg": 215000, "above10kg": 22500
  },
  // Zone 3: USA, Canada, Mexico
  "United States": {
    "0-2kg": 70000, "2.5kg": 102000, "3kg": 125000, "3.5kg": 137000,
    "4kg": 151800, "4.5kg": 165000, "5kg": 178000, "5.5-6kg": 199500,
    "6.5-7kg": 220000, "7.5-8kg": 246000, "8.5-9kg": 270000,
    "9.5-10kg": 295000, "above10kg": 31000
  },
  "Canada": {
    "0-2kg": 70000, "2.5kg": 102000, "3kg": 125000, "3.5kg": 137000,
    "4kg": 151800, "4.5kg": 165000, "5kg": 178000, "5.5-6kg": 199500,
    "6.5-7kg": 220000, "7.5-8kg": 246000, "8.5-9kg": 270000,
    "9.5-10kg": 295000, "above10kg": 31000
  },
  "Mexico": {
    "0-2kg": 70000, "2.5kg": 102000, "3kg": 125000, "3.5kg": 137000,
    "4kg": 151800, "4.5kg": 165000, "5kg": 178000, "5.5-6kg": 199500,
    "6.5-7kg": 220000, "7.5-8kg": 246000, "8.5-9kg": 270000,
    "9.5-10kg": 295000, "above10kg": 31000
  },
  // Zone 4: Europe
  "Germany": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Belgium": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Italy": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Sweden": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "France": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Netherlands": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Switzerland": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Iceland": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Luxembourg": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Turkey": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Finland": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  "Spain": {
    "0-2kg": 72000, "2.5kg": 103000, "3kg": 126500, "3.5kg": 138000,
    "4kg": 154000, "4.5kg": 165000, "5kg": 179000, "5.5-6kg": 209000,
    "6.5-7kg": 226000, "7.5-8kg": 251000, "8.5-9kg": 272000,
    "9.5-10kg": 301000, "above10kg": 32000
  },
  // Zone 5: Africa
  "South Africa": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Tanzania": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Uganda": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Egypt": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Mauritania": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Algeria": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Rwanda": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Namibia": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  "Botswana": {
    "0-2kg": 81500, "2.5kg": 106500, "3kg": 129000, "3.5kg": 140000,
    "4kg": 155000, "4.5kg": 168000, "5kg": 182000, "5.5-6kg": 210000,
    "6.5-7kg": 239000, "7.5-8kg": 252000, "8.5-9kg": 290000,
    "9.5-10kg": 350000, "above10kg": 32000
  },
  // Zone 6: Middle East
  "United Arab Emirates": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Saudi Arabia": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Lebanon": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Bahrain": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Israel": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Oman": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Jordan": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  "Syria": {
    "0-2kg": 86000, "2.5kg": 111500, "3kg": 140000, "3.5kg": 158800,
    "4kg": 171500, "4.5kg": 174000, "5kg": 193000, "5.5-6kg": 215000,
    "6.5-7kg": 250000, "7.5-8kg": 300000, "8.5-9kg": 325000,
    "9.5-10kg": 360000, "above10kg": 33000
  },
  // Zone 7: Asia
  "India": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Singapore": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Thailand": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Philippines": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Malaysia": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Pakistan": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Maldives": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Georgia": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Hong Kong": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Japan": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  "Vietnam": {
    "0-2kg": 94000, "2.5kg": 118500, "3kg": 147500, "3.5kg": 161500,
    "4kg": 172000, "4.5kg": 178000, "5kg": 186000, "5.5-6kg": 231000,
    "6.5-7kg": 270000, "7.5-8kg": 300000, "8.5-9kg": 345000,
    "9.5-10kg": 385000, "above10kg": 37000
  },
  // Zone 8: Australia, Caribbean, South America
  "Australia": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Trinidad and Tobago": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Grenada": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Jamaica": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Saint Lucia": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Uruguay": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Guyana": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "New Zealand": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Saint Kitts and Nevis": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "French Guiana": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  },
  "Dominica": {
    "0-2kg": 105000, "2.5kg": 149000, "3kg": 159000, "3.5kg": 177000,
    "4kg": 191000, "4.5kg": 218000, "5kg": 238000, "5.5-6kg": 284000,
    "6.5-7kg": 330000, "7.5-8kg": 368500, "8.5-9kg": 405000,
    "9.5-10kg": 460000, "above10kg": 40000
  }
};

// Calculate shipping cost based on country and weight
const getShippingCost = (country, weight) => {
  if (country.toLowerCase() === "nigeria") return 5000;
  const countryRates = DHL_RATES[country];
  if (!countryRates) return 0;
  if (weight <= 2) return countryRates["0-2kg"];
  if (weight <= 2.5) return countryRates["2.5kg"];
  if (weight <= 3) return countryRates["3kg"];
  if (weight <= 3.5) return countryRates["3.5kg"];
  if (weight <= 4) return countryRates["4kg"];
  if (weight <= 4.5) return countryRates["4.5kg"];
  if (weight <= 5) return countryRates["5kg"];
  if (weight <= 6) return countryRates["5.5-6kg"];
  if (weight <= 7) return countryRates["6.5-7kg"];
  if (weight <= 8) return countryRates["7.5-8kg"];
  if (weight <= 9) return countryRates["8.5-9kg"];
  if (weight <= 10) return countryRates["9.5-10kg"];
  // For weights above 10kg
  const baseRate = countryRates["9.5-10kg"];
  const additionalWeight = weight - 10;
  return baseRate + (additionalWeight * countryRates["above10kg"]);
};

// Generate Order ID
const generateOrderId = () => {
  return `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

// Send Email Notification
const sendEmailNotification = async (orderData) => {
  try {
    // Replace with your email service API endpoint
    const response = await fetch('https://your-email-service.com/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'timeless.since1982@gmail.com',
        subject: `New Order: ${orderData.orderId}`,
        text: `New Order Details:
Order ID: ${orderData.orderId}
Customer: ${orderData.contact.firstName} ${orderData.contact.lastName}
Email: ${orderData.contact.email}
Phone: ${orderData.shipping.phone}
Shipping Address:
${orderData.shipping.address}
${orderData.shipping.city}, ${orderData.shipping.town || ''} ${orderData.shipping.state}
${orderData.shipping.country}
Items: ${orderData.items.length}
Total: ${formatNGN(orderData.total)}
Shipping: ${formatNGN(orderData.shippingCost)}
`,
      }),
    });
    if (!response.ok) {
      throw new Error('Email service failed');
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't prevent checkout if email fails
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    if (savedCart.length === 0) {
      navigate("/cart");
    }
  }, [navigate]);

  // Form state
  const [contact, setContact] = useState({
    email: "",
    subscribe: false,
  });
  const [shipping, setShipping] = useState({
    country: "Nigeria",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    town: "",
    state: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });
  const [billing, setBilling] = useState({
    sameAsShipping: true,
    country: "Nigeria",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    town: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  // Calculate weight and shipping cost
  const totalWeight = cartItems.reduce((total, item) => total + (item.quantity * 0.5), 0);
  const shippingCost = getShippingCost(shipping.country, totalWeight);
  const total = subtotal + shippingCost;

  // Handlers
  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingSameChange = (e) => {
    setBilling((prev) => ({
      ...prev,
      sameAsShipping: e.target.checked,
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  // Single Payment Link Handler (Using Pre-configured Link)
  const handlePayNow = async () => {
    if (isProcessing) return; // Prevent multiple clicks

    if (!contact.email) {
      alert("Please enter your email or phone number.");
      return;
    }
    if (!shipping.address || !shipping.city || !shipping.state) {
      alert("Please fill in your shipping address.");
      return;
    }

    setIsProcessing(true); // Set processing state

    // Generate order ID
    const orderId = generateOrderId();

    // Prepare order data for email notification
    const orderData = {
      orderId,
      contact: {
        ...contact,
        firstName: shipping.firstName,
        lastName: shipping.lastName
      },
      shipping,
      items: cartItems,
      subtotal,
      shippingCost,
      total,
    };

    // Send email notification to owner
    await sendEmailNotification(orderData);

    // Prepare dynamic parameters for the Paystack link
    // Convert total to kobo (Paystack uses kobo)
    const amountInKobo = Math.round(total * 100);

    // Construct the final Paystack URL with dynamic parameters
    // Replace 'YOUR_PRECONFIGURED_PAYSTACK_LINK' with your actual link
    const preConfiguredPaystackLink = 'https://paystack.shop/pay/timelessluxuries'; // e.g., https://checkout.paystack.com/abc123
    const paystackParams = new URLSearchParams({
        reference: orderId, // Use the generated order ID as the reference
        amount: amountInKobo.toString(), // Pass the calculated amount in kobo
        email: contact.email, // Pass the customer's email
    });

    const finalPaystackUrl = `${preConfiguredPaystackLink}?${paystackParams.toString()}`;

    try {
        // Redirect to the final Paystack URL
        window.location.href = finalPaystackUrl;
    } catch (error) {
        console.error("Error redirecting to Paystack:", error);
        alert("An error occurred while initiating payment. Please try again.");
        setIsProcessing(false); // Reset processing state on error
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-layout">
        {/* Left Column: Form */}
        <div className="checkout-form">
          {/* Contact */}
          <section className="form-section">
            <h2>Contact</h2>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleContactChange}
                placeholder="Email or mobile phone number"
                disabled={isProcessing} // Disable input during processing
              />
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                checked={contact.subscribe}
                onChange={handleContactChange}
                disabled={isProcessing} // Disable checkbox during processing
              />
              <label htmlFor="subscribe">Email me with news and offers</label>
            </div>
          </section>
          <hr className="form-divider" />
          {/* Delivery */}
          <section className="form-section">
            <h2>Delivery</h2>
            <div className="form-group">
              <select
                id="country"
                name="country"
                value={shipping.country}
                onChange={handleShippingChange}
                disabled={isProcessing} // Disable select during processing
              >
                <option value="Nigeria">Nigeria</option>
                <option value="UK">UK</option>
                <option value="Ireland">Ireland</option>
                <option value="Benin">Benin</option>
                <option value="Ghana">Ghana</option>
                <option value="Gambia">Gambia</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Togo">Togo</option>
                <option value="Liberia">Liberia</option>
                <option value="Mali">Mali</option>
                <option value="Niger">Niger</option>
                <option value="Cameroon">Cameroon</option>
                <option value="United States">USA</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Belgium">Belgium</option>
                <option value="Italy">Italy</option>
                <option value="Sweden">Sweden</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Iceland">Iceland</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Turkey">Turkey</option>
                <option value="Finland">Finland</option>
                <option value="Spain">Spain</option>
                <option value="South Africa">South Africa</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Uganda">Uganda</option>
                <option value="Egypt">Egypt</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Algeria">Algeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Namibia">Namibia</option>
                <option value="Botswana">Botswana</option>
                <option value="United Arab Emirates">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Israel">Israel</option>
                <option value="Oman">Oman</option>
                <option value="Jordan">Jordan</option>
                <option value="Syria">Syria</option>
                <option value="India">India</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
                <option value="Philippines">Philippines</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Maldives">Maldives</option>
                <option value="Georgia">Georgia</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Japan">Japan</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Australia">Australia</option>
                <option value="Trinidad and Tobago">Trinidad & Tobago</option>
                <option value="Grenada">Grenada</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Guyana">Guyana</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Saint Kitts and Nevis">St. Kitts & Nevis</option>
                <option value="French Guiana">French Guiana</option>
                <option value="Dominica">Dominica</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={shipping.firstName}
                  onChange={handleShippingChange}
                  placeholder="First name (optional)"
                  disabled={isProcessing} // Disable input during processing
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={shipping.lastName}
                  onChange={handleShippingChange}
                  placeholder="Last name"
                  required
                  disabled={isProcessing} // Disable input during processing
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                placeholder="Address"
                required
                disabled={isProcessing} // Disable input during processing
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={shipping.apartment}
                onChange={handleShippingChange}
                placeholder="Apartment, suite, etc. (optional)"
                disabled={isProcessing} // Disable input during processing
              />
            </div>
            <div className="form-row">
              <div className="form-group third">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  required
                  disabled={isProcessing} // Disable input during processing
                />
              </div>
              <div className="form-group third">
                <input
                  type="text"
                  id="town"
                  name="town"
                  value={shipping.town || ""}
                  onChange={handleShippingChange}
                  placeholder="Town (optional)"
                  disabled={isProcessing} // Disable input during processing
                />
              </div>
              <div className="form-group third">
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  placeholder="State"
                  required
                  disabled={isProcessing} // Disable input during processing
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="phone"
                name="phone"
                value={shipping.phone}
                onChange={handleShippingChange}
                placeholder="Phone"
                disabled={isProcessing} // Disable input during processing
              />
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={shipping.saveInfo}
                onChange={(e) =>
                  setShipping((prev) => ({
                    ...prev,
                    saveInfo: e.target.checked,
                  }))
                }
                disabled={isProcessing} // Disable checkbox during processing
              />
              <label htmlFor="saveInfo">Save this information for next time</label>
            </div>
          </section>
          <hr className="form-divider" />
          {/* Shipping Method */}
          <section className="form-section">
            <h2>Shipping method</h2>
            <div className="shipping-option">
              <input
                type="radio"
                id="dhl"
                name="shippingMethod"
                value="dhl"
                checked={true}
                readOnly
              />
              <label htmlFor="dhl">
                <span className="shipping-name">DHL Express</span>
                <span className="shipping-price">{formatNGN(shippingCost)}</span>
              </label>
              <p className="shipping-weight">Weight: {totalWeight.toFixed(1)}kg</p>
            </div>
          </section>
          <hr className="form-divider" />
          {/* Payment */}
          <section className="form-section">
            <h2>Payment</h2>
            <div className="payment-method">
              <div className="payment-header">
                <span>Paystack</span>
              </div>
              <p className="payment-note">
                All transactions are secure and encrypted.
              </p>
              <div className="payment-redirect-box">
                <VscCreditCard className="atm" />
                <p>
                  After clicking "Pay now", you will be redirected to Paystack to complete your purchase securely.
                </p>
              </div>
            </div>
          </section>
          <hr className="form-divider" />
          {/* Billing Address */}
          <section className="form-section">
            <h2>Billing address</h2>
            <div className="form-radio-group">
              <div className="form-radio">
                <input
                  type="radio"
                  id="sameAsShipping"
                  name="billingAddress"
                  checked={billing.sameAsShipping}
                  onChange={handleBillingSameChange}
                  disabled={isProcessing} // Disable radio during processing
                />
                <label htmlFor="sameAsShipping">Same as shipping address</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="differentBilling"
                  name="billingAddress"
                  checked={!billing.sameAsShipping}
                  onChange={() => setBilling((prev) => ({ ...prev, sameAsShipping: false }))}
                  disabled={isProcessing} // Disable radio during processing
                />
                <label htmlFor="differentBilling">Use a different billing address</label>
              </div>
            </div>
            {!billing.sameAsShipping && (
              <div className="billing-form">
                <div className="form-group">
                  <select
                    id="billCountry"
                    name="country"
                    value={billing.country}
                    onChange={handleBillingChange}
                    disabled={isProcessing} // Disable select during processing
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="UK">UK</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Benin">Benin</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Togo">Togo</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Mali">Mali</option>
                    <option value="Niger">Niger</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="United States">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Germany">Germany</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Italy">Italy</option>
                    <option value="Sweden">Sweden</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Finland">Finland</option>
                    <option value="Spain">Spain</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Botswana">Botswana</option>
                    <option value="United Arab Emirates">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Israel">Israel</option>
                    <option value="Oman">Oman</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Syria">Syria</option>
                    <option value="India">India</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Japan">Japan</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Australia">Australia</option>
                    <option value="Trinidad and Tobago">Trinidad & Tobago</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Guyana">Guyana</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Saint Kitts and Nevis">St. Kitts & Nevis</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="Dominica">Dominica</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <input
                      type="text"
                      id="billFirstName"
                      name="firstName"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      placeholder="First name (optional)"
                      disabled={isProcessing} // Disable input during processing
                    />
                  </div>
                  <div className="form-group half">
                    <input
                      type="text"
                      id="billLastName"
                      name="lastName"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      placeholder="Last name"
                      required
                      disabled={isProcessing} // Disable input during processing
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="billAddress"
                    name="address"
                    value={billing.address}
                    onChange={handleBillingChange}
                    placeholder="Address"
                    required
                    disabled={isProcessing} // Disable input during processing
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="billApartment"
                    name="apartment"
                    value={billing.apartment}
                    onChange={handleBillingChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    disabled={isProcessing} // Disable input during processing
                  />
                </div>
                <div className="form-row">
                  <div className="form-group third">
                    <input
                      type="text"
                      id="billCity"
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      placeholder="City"
                      required
                      disabled={isProcessing} // Disable input during processing
                    />
                  </div>
                  <div className="form-group third">
                    <input
                      type="text"
                      id="billTown"
                      name="town"
                      value={billing.town || ""}
                      onChange={handleBillingChange}
                      placeholder="Town (optional)"
                      disabled={isProcessing} // Disable input during processing
                    />
                  </div>
                  <div className="form-group third">
                    <input
                      type="text"
                      id="billState"
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                      placeholder="State"
                      required
                      disabled={isProcessing} // Disable input during processing
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="billPhone"
                    name="phone"
                    value={billing.phone}
                    onChange={handleBillingChange}
                    placeholder="Phone (optional)"
                    disabled={isProcessing} // Disable input during processing
                  />
                </div>
              </div>
            )}
          </section>
          <button className="pay-now-btn" onClick={handlePayNow} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay now"}
          </button>
        </div>
        {/* Right Column: Order Summary */}
        <div className="order-summary">
          {cartItems.map((item, index) => (
            <div className="summary-item" key={index}>
              <img
                src={item.image || "https://via.placeholder.com/60"}
                alt={item.name || "Product"}
                className="item-image"
              />
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-meta">Qty: {item.quantity}</div>
              </div>
              <div className="item-price">
                {formatNGN(parsePrice(item.price) * item.quantity)}
              </div>
            </div>
          ))}
          <div className="discount-section">
            <input
              type="text"
              placeholder="Discount code"
              className="discount-input"
              disabled={isProcessing} // Disable input during processing
            />
            <button className="apply-btn" disabled={isProcessing}>Apply</button>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatNGN(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping (DHL - {shipping.country})</span>
            <span>{formatNGN(shippingCost)}</span>
          </div>
          <div className="summary-row">
            <span>Weight</span>
            <span>{totalWeight.toFixed(1)}kg</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatNGN(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;