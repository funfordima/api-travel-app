import { MongoClient } from 'mongodb';

class MongoController {
  dbName: string;
  URL: string;
  // instance: any;
  static instance: any;
  client: MongoClient;

  constructor() {
    this.dbName = 'travel-app';
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
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCollection(collectionName: string) {
    try {
      const db = await this.getMongoInstance();
      const collection = db.collection(collectionName);

      return collection;
    } catch (err) {
      throw new Error(err);
    }
  }

  async listAll(collectionName: string) {
    const collection = await this.getCollection(collectionName);

    return collection.find({}).toArray();
  }

  async getById(collectionName: string, id: string) {
    const collection = await this.getCollection(collectionName);

    return collection.findOne({ id });
  }

  async createItem(collectionName: string, item: any) {
    const collection = await this.getCollection(collectionName);
    const response = await collection.insertOne(item);

    return response.ops[0];
  }

  async createItems(collectionName: string, item: any) {
    const collection = await this.getCollection(collectionName);
    const response = await collection.insertMany(item);

    return response.ops[0];
  }

  async deleteItem(collectionName: string, id: string) {
    const collection = await this.getCollection(collectionName);

    return collection.deleteOne({ id });
  }

  async updateItem(collectionName: string, item: any) {
    const collection = await this.getCollection(collectionName);
  
    const id = item._id;
  
    const response = await collection.replaceOne({ id }, item);
  
    return response.ops[0];
  }
}

export default MongoController;
