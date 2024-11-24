const fs = require('fs').promises;
const path = require('path');

class GalleryService {
  async getGalleryData(galleryName) {
    const galleryPath = `/galleries/${galleryName}`;
    const imagesPath = path.join(process.cwd(), 'public', galleryPath, 'images');
    const videosPath = path.join(process.cwd(), 'public', galleryPath, 'videos');

    const imageNames = await fs.readdir(imagesPath);
    const videosFolderExists = await this.checkFolderExists(videosPath);

    return {
      galleryPath,
      imageNames: imageNames.reverse(),
      videosFolderExists
    };
  }

  async getAllGalleries() {
    const galleriesPath = path.join(process.cwd(), 'public/galleries');
    return await fs.readdir(galleriesPath);
  }

  async checkFolderExists(folderPath) {
    try {
      await fs.access(folderPath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new GalleryService();
