import ProductsMongoDao from "./producsMongo.dao.js";
import CartMongoDao from "./cartMongo.dao.js";
import UserMongoDao from "./userMongo.dao.js";
import MessagesMongoDao from "./messagesMongo.dao.js";

export class CartDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new CartMongoDao();
    }
  }
}

export class ProductDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new ProductsMongoDao();
    }
  }
}

export class UserDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new UserMongoDao();
    }
  }
}
export class MessagesDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new MessagesMongoDao();
    }
  }
}