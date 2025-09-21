export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
  blockchain: {
    rpcUrl: process.env.POLYGON_RPC_URL,
    privateKey: process.env.WALLET_PRIVATE_KEY, // **HIGHLY SECURE**
    contractAddress: process.env.CERTIFICATE_NFT_ADDRESS,
  },
  aiService: {
    baseUrl: process.env.AI_SERVICE_URL,
    apiKey: process.env.AI_SERVICE_API_KEY,
  },
};