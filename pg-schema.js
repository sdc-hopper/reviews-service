const createTable = async (pool) => {
  try {
    await pool.query(`DROP TABLE IF EXISTS reviews;`);
    await pool.query(`
      CREATE TABLE reviews (
        reviewId varchar(20) PRIMARY KEY,
        productId varchar(20),
        color varchar(20),
        configuration varchar(400),
        isBestSeller boolean,
        category varchar(400),
        customerId varchar(20),
        customerName varchar(400),
        customerCountry varchar(400),
        profilePicUrl varchar(100),
        title varchar(400),
        description varchar(500),
        rating varchar(20),
        isVerifiedPurchase boolean,
        isHelpfulCount boolean,
        imageUrls varchar(40),
        reviewDate varchar(100),
        easeToUse integer,
        voiceRecognition integer,
        techSupport integer,
        valueForMoney integer,
        qualityOfMaterial integer,
        batteryLife integer
      );
      CREATE INDEX reviewIdIdx ON reviews(reviewId);
    `);
    console.log('created table reviews...');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports.createTable = createTable;