# 🌩️ Cloud Resume Challenge - AWS Implementation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-godevtech.cloud-blue?style=for-the-badge&logo=aws)](https://godevtech.cloud)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Terraform](https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

> **A modern, cloud-native resume website built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/docs/the-challenge/aws/) by Forrest Brazeal**

This project demonstrates cloud engineering skills through a real-world implementation featuring serverless architecture, Infrastructure as Code, CI/CD automation, and security best practices.

## 🚀 Live Demo

**Visit the live website:** [godevtech.cloud](https://godevtech.cloud)

## 👤 About

**Devin Emmans-Bosley** - Cloud Engineer & DevSecOps Enthusiast  
📍 Culpeper, VA  
🔗 [LinkedIn](https://linkedin.com/in/devin-emmans-bosley) | [GitHub](https://github.com/DevHAXog)

## 📋 Project Overview

This Cloud Resume Challenge implementation showcases:

- **Modern Web Design**: Responsive, dark-mode enabled interface built with Tailwind CSS
- **Serverless Architecture**: AWS Lambda, DynamoDB, and API Gateway for dynamic functionality
- **Infrastructure as Code**: Terraform for reproducible cloud infrastructure
- **Automated Deployment**: GitHub Actions for continuous integration and deployment
- **Security Best Practices**: HTTPS, secure headers, minimal IAM permissions
- **Performance Optimization**: CloudFront CDN, optimized assets, and caching strategies

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Route 53      │    │   CloudFront     │    │   S3 Bucket     │
│   DNS Hosting   │───▶│   CDN + SSL      │───▶│   Static Site   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   DynamoDB      │◀───│   API Gateway    │◀───│   Lambda        │
│   Visit Counter │    │   REST API       │    │   Python        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   CloudWatch     │
                       │   Monitoring     │
                       └──────────────────┘
```

## 🛠️ Technology Stack

### **Frontend**
- **HTML5**: Semantic markup and modern styling
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Dynamic interactions and API calls
- **Responsive Design**: Mobile-first approach

### **Backend & Cloud Services**
- **AWS S3**: Static website hosting
- **AWS CloudFront**: Global CDN with SSL/TLS
- **AWS Route 53**: DNS management
- **AWS Lambda**: Serverless function for visitor counter
- **AWS DynamoDB**: NoSQL database for visitor count
- **AWS API Gateway**: RESTful API endpoints
- **AWS CloudWatch**: Monitoring and logging

### **DevOps & Automation**
- **Terraform**: Infrastructure as Code
- **GitHub Actions**: CI/CD pipeline
- **Python**: Lambda function development
- **Boto3**: AWS SDK for Python

## 📁 Project Structure

```
├── 📄 index.html              # Main homepage
├── 📄 resume.html             # Resume page
├── 📄 blog.html               # Blog page
├── 📄 error.html              # 404 error page
├── 📂 assets/                 # Static assets
│   ├── 📂 cert-logos/         # Certification badges
│   └── 📂 Pictures/           # Profile images
├── 📂 css/                    # Stylesheets
│   ├── 📄 modern-styles.css   # Custom CSS
│   └── 📄 styles.css          # Base styles
├── 📂 js/                     # JavaScript files
│   ├── 📄 counter.js          # Visitor counter logic
│   ├── 📄 enhanced-scroll-animations.js  # Scroll animations
│   └── 📄 main.js             # Core functionality
├── 📂 lambda/                 # AWS Lambda functions
│   └── 📄 counter.py          # Visitor counter backend
├── 📂 terraform/              # Infrastructure as Code (planned)
│   ├── 📄 main.tf            # Main Terraform configuration
│   ├── 📄 variables.tf       # Variable definitions
│   └── 📄 outputs.tf         # Output values
├── 📂 .github/workflows/      # CI/CD pipelines
│   └── 📄 deploy.yml         # GitHub Actions workflow
└── 📄 README.md              # This file
```

## ✨ Key Features

### 🎨 **Modern UI/UX**
- Dark/Light mode toggle with system preference detection
- Smooth scroll animations using Intersection Observer API
- Glass morphism design elements
- Responsive layout for all device sizes
- Accessible design following WCAG guidelines

### 🔢 **Dynamic Visitor Counter**
- Real-time visitor tracking using AWS Lambda + DynamoDB
- Graceful fallback to simulation mode during development
- Animated counter with smooth transitions
- Error handling and retry logic

### 📊 **Performance Optimized**
- CloudFront CDN for global content delivery
- Optimized images and assets
- Lazy loading for improved performance
- Minified CSS and JavaScript

### 🔒 **Security Focused**
- HTTPS everywhere with SSL/TLS certificates
- Secure headers implementation
- Minimal IAM permissions following least privilege principle
- Input validation and sanitization

## 🚀 Deployment Process

### **Automated CI/CD Pipeline**
1. **Source Control**: Code pushed to GitHub repository
2. **Build Process**: GitHub Actions validates and builds assets
3. **Infrastructure**: Terraform provisions AWS resources
4. **Deployment**: Static files uploaded to S3, Lambda functions deployed
5. **CDN Invalidation**: CloudFront cache invalidated for immediate updates

### **Manual Deployment Steps**
```bash
# 1. Clone the repository
git clone https://github.com/DevHAXog/cloud-resume-challenge.git
cd cloud-resume-challenge

# 2. Install dependencies (if using npm for dev tools)
npm install

# 3. Configure AWS credentials
aws configure

# 4. Deploy infrastructure with Terraform
cd terraform
terraform init
terraform plan
terraform apply

# 5. Upload website files to S3
aws s3 sync ../ s3://your-bucket-name --exclude "terraform/*" --exclude ".git/*"

# 6. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔧 Local Development

```bash
# 1. Start local development server
python -m http.server 8000

# 2. Open browser to http://localhost:8000

# 3. Make changes and test locally
# The visitor counter will use simulation mode automatically
```

## 📊 AWS Services Used

| Service | Purpose | Implementation |
|---------|---------|----------------|
| **S3** | Static website hosting | Stores HTML, CSS, JS, and assets |
| **CloudFront** | CDN + SSL/TLS | Global content delivery and HTTPS |
| **Route 53** | DNS management | Domain registration and routing |
| **Lambda** | Serverless backend | Visitor counter API endpoint |
| **DynamoDB** | Database | Stores visitor count data |
| **API Gateway** | REST API | Exposes Lambda function as HTTP API |
| **CloudWatch** | Monitoring | Logs, metrics, and alerting |
| **IAM** | Security | Roles and policies for access control |

## 📈 Monitoring & Analytics

- **CloudWatch Logs**: Lambda function execution logs
- **CloudWatch Metrics**: API Gateway performance metrics
- **CloudFront Reports**: Traffic and performance analytics
- **DynamoDB Metrics**: Database performance monitoring

## 🔐 Security Implementations

- **HTTPS Only**: All traffic encrypted with TLS 1.2+
- **CORS Configuration**: Proper cross-origin resource sharing settings
- **IAM Least Privilege**: Minimal permissions for all AWS resources
- **Input Validation**: Sanitization of all user inputs
- **Security Headers**: CSP, HSTS, and other protective headers

## 🎯 Learning Outcomes

Through this project, I gained hands-on experience with:

- ✅ **Serverless Architecture**: Building scalable, cost-effective solutions
- ✅ **Infrastructure as Code**: Managing cloud resources with Terraform
- ✅ **CI/CD Pipelines**: Automated testing and deployment workflows
- ✅ **Cloud Security**: Implementing security best practices
- ✅ **Frontend Development**: Modern web development techniques
- ✅ **DevOps Practices**: End-to-end development and operations

## 🚧 Roadmap & Improvements

### **Current Phase**
- [x] Static website deployment
- [x] Custom domain with SSL
- [x] Visitor counter functionality
- [x] Responsive design implementation

### **Next Phase**
- [ ] Complete Terraform infrastructure provisioning
- [ ] Enhanced monitoring and alerting
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Blog functionality with dynamic content

### **Future Enhancements**
- [ ] Contact form with AWS SES
- [ ] Multi-region deployment
- [ ] Advanced analytics dashboard
- [ ] Automated security scanning
- [ ] Progressive Web App features

## 🤝 Contributing

While this is a personal project, I welcome feedback and suggestions! Feel free to:

- Open an issue for bugs or suggestions
- Submit a pull request for improvements
- Share your own Cloud Resume Challenge implementation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Devin Emmans-Bosley**
- 🌐 Website: [godevtech.cloud](https://godevtech.cloud)
- 💼 LinkedIn: [devin-emmans-bosley](https://linkedin.com/in/devin-emmans-bosley)
- 🐙 GitHub: [DevHAXog](https://github.com/DevHAXog)
- 📧 Email: emmansdevin@gmail.com

---

## 🙏 Acknowledgments

- **Forrest Brazeal** for creating the [Cloud Resume Challenge](https://cloudresumechallenge.dev/)
- **AWS Community** for extensive documentation and tutorials
- **Terraform Community** for Infrastructure as Code best practices
- **Open Source Contributors** whose tools and libraries made this project possible

---

<div>
<img src="https://img.shields.io/badge/Built%20with-❤️-red?style=for-the-badge" alt="Built with Love">
<img src="https://img.shields.io/badge/Powered%20by-AWS-orange?style=for-the-badge&logo=amazon-aws" alt="Powered by AWS">
<img src="https://img.shields.io/badge/Deployed%20with-Terraform-purple?style=for-the-badge&logo=terraform" alt="Deployed with Terraform">
</div>

**⭐ If you found this project helpful, please consider giving it a star!**
