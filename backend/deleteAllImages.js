const Image = require('./models/Image'); // Залежно від шляху до моделі

async function deleteAllImages() {
  try {
    await Image.destroy({
      where: {},
      truncate: true // Видаляє всі записи і скидає автоінкрементний лічильник
    });
    console.log('All images deleted');
  } catch (error) {
    console.error(error);
  }
}

module.exports = deleteAllImages; 