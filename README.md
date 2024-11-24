<div align="center">

# Laurent X. Dubois (Portfolio Website)

<img
  src="public/gif/website-preview.gif"
  alt="Website Preview"
  width="800"
  style="max-width: 100%;">

[🌐 View Live Website](https://laurentxdubois.com)

A modern photography portfolio website showcasing the work of
Laurent X. Dubois, professional photographer based in Paris.

</div>

## ✨ Features

- **Pure Implementation**: Built without frontend frameworks, demonstrating
strong vanilla development skills
- **Modern Architecture**: Node.js/Express backend with EJS templating
- **Docker Integration**: Production and development environments using Docker
- **Responsive Design**: Mobile-first approach using pure SCSS
- **Image Gallery System**: Dynamic gallery management with smooth transitions
- **Contact System**: Secure email integration with Gmail API
- **SEO Optimization**: Built-in SEO optimization with dynamic metadata
- **Analytics**: Google Analytics integration
- **Performance**: Optimized image loading and minimal dependencies
- **Bilingual Support**: Full French and English language support with dynamic
content switching

## 🚀 Getting Started

### Prerequisites

- Docker (version 20.10.0 or higher)
- Node.js v22+ (for local development)
- Gmail account (for contact form)

### Environment Variables

Create a `.env` file in the root directory:

```env
SENDER_GMAIL_USER=your.email@gmail.com
SENDER_GMAIL_PASSWORD=your_gmail_app_password
RECIPIENT_EMAIL=recipient@example.com
GOOGLE_ANALYTICS_MEASUREMENT_ID=your_ga_id
```

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd laurent_x_dubois
```

2. **Build and start development container**
```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose up dev
```

The development server will start on port 3000 with hot-reload enabled.

### Production Deployment

1. **Build and start production container**
```bash
docker compose up prod
```

## 📂 Project Structure

```
.
├── locales/                 # Language files (EN/FR)
├── public/                  # Static assets
│   ├── galleries/          # Photo galleries
│   ├── js/                 # Client-side JavaScript
│   └── img/                # Static images
├── scss/                   # SCSS stylesheets
├── src/
│   ├── config/            # App configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── routes/           # Express routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── views/            # EJS templates
└── docker-compose.yaml    # Docker configuration
```

## 🎨 Features Detail

### Gallery Management

Add new galleries by creating a directory structure:
```
public/galleries/<gallery_name>/
├── images/
│   └── [gallery images]
└── videos/
    └── video.mp4         # Optional background video
```

### Localization

- Content is managed through JSON files in `locales/`
- Supports English and French with easy addition of new languages
- URL-based language switching (/en/*)

### Styling

- Custom SCSS architecture
- Mobile-first responsive design
- No CSS frameworks/dependencies

### Contact Form

- Secure email sending via Gmail API
- Form validation
- Custom email templates
- Error handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **View Engine**: EJS
- **Styling**: SCSS
- **Containerization**: Docker
- **Email**: Nodemailer with Gmail
- **Analytics**: Google Analytics

## 📝 License

This project is licensed under the MIT License with additional terms - see the
[LICENSE](LICENSE) file for details.

## 🤝 Contact

For questions or support:
- **Email**: lohiermichael@gmail.com
- **Issues**: Open an issue in this repository
