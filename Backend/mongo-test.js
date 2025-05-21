require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    process.exit(0);
}).catch((err) => {
    console.error("❌ Connection failed:", err);
    process.exit(1);
});
