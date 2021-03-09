import { Collection, MongoClient } from 'mongodb';

class MongoController {
  dbName: string;
  URL: string;
  // instance: any;
  static instance: any;
  client: MongoClient;

  constructor() {
    this.dbName = 'test';
    this.URL = `mongodb+srv://admin:qwerty123@cluster0.zasbp.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;

    if (!MongoController.instance) {
      MongoController.instance = this;
    }

    return MongoController.instance;
  }
  
  async getMongoInstance() {
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(this.URL, { useUnifiedTopology: true });
      }
      
      return this.client.db(this.dbName);
    } catch(e) {
      throw new Error(e);
    }
  };

  async getCollection(collectionName: string) {
    try {
      const db = await this.getMongoInstance();
      const collection = db.collection(collectionName);

      return collection;
    } catch(err) {
      throw new Error(err);
    }
  };

  async listAll(collectionName: string) {
    const collection = await this.getCollection(collectionName);

    return collection.find({}).toArray();
  }
};

export default MongoController;
