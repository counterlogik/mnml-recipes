let CONFIG = {}; // make global

CONFIG.app = process.env.APP || "development";
CONFIG.port = process.env.PORT = "3001";

CONFIG.db_host = process.env.DB_HOST = "ds125001.mlab.com";
CONFIG.db_port = process.env.DB_PORT = "25001";
CONFIG.db_name = process.env.DB_NAME = "mern_recipes";
CONFIG.db_user = process.env.DB_USER = "addisonstaples";
CONFIG.db_password = process.env.DB_PASSWORD = "AwHjqLqsn9j8CCzMysgQ";

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION = "PleaseChange";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION = "10000";

module.exports = CONFIG;
