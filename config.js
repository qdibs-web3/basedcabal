const API_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : `http://localhost:${process.env.PORT || 5000}`;

export default API_URL;