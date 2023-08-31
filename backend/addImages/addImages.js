const fs = require('fs');
const path = require('path');
const Image = require('../models/Image'); 
const { v4: uuidv4 } = require('uuid')

const imageDirectory = path.join(__dirname, './images');

function generateId() {
    return uuidv4();
}

const imageFiles = fs.readdirSync(imageDirectory);

async function addImagesToDatabase() {
  try {
    for (const imageFile of imageFiles) {
      const imagePath = path.join('images', imageFile);

      await Image.create({
        id: generateId(),
        imagePath,
      });

      console.log(`Image added: ${imageFile}`);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = addImagesToDatabase;