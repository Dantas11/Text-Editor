// import { openDB } from "idb";

// const initdb = async () =>
//   openDB("jate", 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains("jate")) {
//         console.log("jate database already exists");
//         return;
//       }
//       db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
//       console.log("jate database created");
//     },
//   });

// // Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {
//   // connect to DB and version we want to use
//   const jateDb = await openDB("jate", 1);
//   // make new transaction, specify the DB we are posting to and the data privileges
//   const tx = jateDb.transaction("jate", "readwrite");
//   // open the object store
//   const store = tx.objectStore("jate");
//   // pass in content
//   const request = store.put({ id: 1, value: content });
//   // confirm the data was added
//   const result = await request;
//   console.log("Data saved to the database", result);
// };

// // Add logic for a method that gets all the content from the database
// export const getDb = async () => {
//   console.log("GET from the database");
//   // connect to DB and version we want to use
//   const jateDB = await openDB("jate", 1);
//   // create a new transaction and specify the store and data privileges
//   const tx = jateDB.transaction("jate", "readonly");
//   // open up the desired object store
//   const store = tx.objectStore("jate");
//   // get all data in the database
//   const request = store.getAll();
//   // get confirmation of the request
//   const result = await request;
//   console.log(result);
//   return result;
// };

// initdb();

import { openDB } from "idb";

const DB_NAME = "jate";
const DB_VERSION = 1;
const DB_STORE_NAME = "jate";

const initdb = () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_STORE_NAME)) {
        console.log(`${DB_STORE_NAME} database already exists`);
        return;
      }
      db.createObjectStore(DB_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log(`${DB_STORE_NAME} database created`);
    },
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    // Create a connection to the database database and version we want to use.
    // const jateDB = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = db.transaction(DB_STORE_NAME, "readwrite");

    // Open up the desired object store.
    const store = tx.objectStore(DB_STORE_NAME);
    // Put requires an object as an argument.
    await store.put({ value: content, id: 1 });
    tx.oncomplete;
    // Get confirmation of the request.
    console.log("Data added to the database", content);
  } catch (error) {
    console.error("Error adding data to the database", error);
    throw error;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    // Create a connection to the database database and version we want to use.
    // const jateDB = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = db.transaction(DB_STORE_NAME, "readonly");

    // Open up the desired object store.
    const store = tx.objectStore(DB_STORE_NAME);
    const result = await store.get(1);
    console.log("result", result);
    // Get confirmation of the request.
    console.log("result.value", result.value);
    return result.value;
  } catch (error) {
    console.error("Error getting data from the database", error);
    throw error;
  }
};

initdb();
