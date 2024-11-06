<div align="center">

# Laurent X. Dubois (website)

  <img
    src="public/gif/website-preview.gif"
    alt="Website Preview"
    width="800"
    style="max-width: 100%;">


  [🌐 View Live Website](https://your-portfolio-url.com)

  A modern, responsive photography portfolio website the photographs of Lauren
  X. Dubois.

</div>


## ✨ Features

- **Pure Implementation**: Built without frontend frameworks or CSS packages,
showcasing strong fundamental development skills
- **Responsive Design**: Seamlessly adapts to all device sizes using pure CSS
- **Custom Animations**: Smooth, performant animations implemented in vanilla
JavaScript
- **Contact Integration**: Secure email contact form with Gmail API
- **Gallery Management**: Flexible image gallery system
- **Analytics Ready**: Built-in Google Analytics integration
- **SEO Optimized**: Customizable SEO word system for better visibility

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Gmail account (for contact form)

### Quick Start

1. **Build the Container**
```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
```

2. **Launch the Application**

Production Mode:
```bash
docker-compose up prod
```

Development Mode (with hot reload):
```bash
docker-compose up dev
```

## 📧 Email Integration

1. Generate Gmail application token following
   [Google's official instructions](https://support.google.com/accounts/answer/185833?hl=en)
2. Add token to `.env` file:
```env
SENDER_GMAIL_PASSWORD=your_token_here
```

## 🖼️ Gallery Management

1. Create new gallery folder:
```
src/public/galleries/<gallery_name>/
├── images/
│   └── [your gallery images]
└── videos/
    └── video.mp4
```

2. To add gallery to navigation menu, update:
```
src/views/partials/header.ejs
```

## 📊 Google Analytics Setup

1. Add measurement ID to `.env`:
```env
GOOGLE_ANALYTICS_MEASUREMENT_ID=your_ga_id
```

## 🔍 SEO Configuration

1. Edit/create `/public/data/SEOWords.txt`
2. Add keywords (one per line):
```
keyword1
keyword2
keyword3
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Styling**: SCSS
- **Containerization**: Docker
- **Analytics**: Google Analytics
- **Email**: Gmail API

## 📝 Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
file for details.

## 🤝 Contact

For questions or support, please use the contact form on the website or open an
issue in this repository.

