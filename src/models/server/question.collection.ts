import { DatabasesIndexType, OrderBy, Permission } from "node-appwrite"

import { db, questionCollection } from "../name"
import { databases } from "./config"

export default async function createQuestionCollection() {
  // create collection if it doesn't exist
  try {
    await databases.createCollection(db, questionCollection, questionCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ])
    console.log("Question collection is created")
  } catch (error) {
    const err = error as { code?: number; message?: string }
    if (err.code === 409) {
      console.log("Question collection already exists")
    } else {
      console.log("Error creating question collection:", err.message)
      throw error
    }
  }

  // creating attributes
  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 10000, true),
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
  ]).catch((error) => {
    console.log("Error creating question attributes:", error)
    throw error
  })
  console.log("Question Attributes created")

  // create indexes
  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      DatabasesIndexType.Fulltext,
      ["title"],
      [OrderBy.Asc]
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      DatabasesIndexType.Fulltext,
      ["content"],
      [OrderBy.Asc]
    ),
  ]).catch((error) => {
    console.log("Error creating question indexes:", error)
    throw error
  })
  console.log("Question Indexes created")
}
