import { randomBytes } from "crypto";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection, Types } from "mongoose";
import { Item } from "./models/item";
import { User } from "./models/user";

const DB_NAME = "DemoDB";

const initiateDb = async () => {
	const mongod = new MongoMemoryServer({
		instance: {
			dbName: DB_NAME,
			dbPath: "data",
			storageEngine: "wiredTiger",
		},
	});
	await mongod.start();
	return mongod;
};

const initiateMongoose = async () => {
	const mongod = await initiateDb();
	const uri = mongod.getUri();
	await connect(uri, { dbName: DB_NAME });
	console.log("Connected to db", uri);
	return mongod;
};

const dropDb = async () => {
	const mongod = await initiateMongoose();
	await connection.dropDatabase();
	await connection.close();
	await mongod.stop();
	console.log("Database dropped");
};

const createInitialData = async () => {
	if ((await Item.find({})).length === 0) {
		const user1 = await User.create({
			username: "user1",
		});

		const user2 = await User.create({
			username: "user2",
		});

		const user3 = await User.create({
			username: "user2",
		});

		await Promise.all([
			Item.create({
				description: "A very nice button-down shirt",
				images: [
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
				],
				owner: new Types.ObjectId(user1.id),
				ownerPrices: [180],
				currency: "SEK",
			}),
			Item.create({
				description: "A pair of pants",
				images: [
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
				],
				owner: new Types.ObjectId(user2.id),
				ownerPrices: [150],
				currency: "SEK",
			}),
			Item.create({
				description: "This is a dress",
				images: [
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
					`http://example.image-${randomBytes(4).toString("hex")}.jpg`,
				],
				owner: new Types.ObjectId(user1.id),
				ownerPrices: [300],
				currency: "SEK",
			}),
		]);
		console.log("Finished creating initial data");
	}
};

export default {
	initiateDb,
	initiateMongoose,
	dropDb,
	createInitialData,
};
