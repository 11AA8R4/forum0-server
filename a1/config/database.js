module.exports={
    dialect:'postgres',
    dialectOptions: {
      supportBigNumbers: true
    },
    host:'localhost',
    username:'postgres',
    password:'uzumaki9',
    database:'intergalaxy',
    define:{
        timestamps:true,
        underscored:true,
        underscoredAll:true
    },
    // migrationStorage:'json'
}

