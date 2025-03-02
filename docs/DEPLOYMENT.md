# How to deploy the full-stack application on AWS

The production ready build is already live and available on http://44.211.144.42:3000

### 1. Prepare AWS EC2 Instance
#### a. Create EC2 Instance

1. Log in to AWS Console

2. Go to EC2 > Instances > Launch Instances

3. Choose:

    - Amazon Linux 2023 AMI


4. Configure security group:

    - Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000, 5000

5. Configure Network settings:

    - Select the options ***Allow HTTPS traffic from the internet*** and ***Allow HTTP traffic from the internet***

6. Create/download a new key pair (.pem file)

#### b. Connect to EC2 Instance

```
chmod 400 your-key.pem
ssh -i "your-key.pem" ec2-user@your-instance-public-dns
```

### 2. Install Dependencies
#### a. Update System

```
sudo yum update -y
```

#### b. Install Node.js & npm

```
sudo yum install -y gcc-c++ make
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 20  # Node.js LTS version
```

#### c. Install PM2 (Process Manager)
```
npm install -g pm2
```

#### d. Install Git
```
sudo yum install git
```

### 3. Deploy Application

#### a. Include ssh key to repository to be able to clone the codebase.
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### b. Git clone the repository
```
mkdir app && git clone git@github.com:davi-silva/reonic-challenge.git ./app
```

#### c. Install npm dependencies
```
npm i && cd client/ && npm i && cd ../server && npm i
```

### 4. Include .env files
#### a. Include .env files in the respective folders
.env
```
POSTGRES_VOLUME=postgres-db
POSTGRES_USER=postgres
DATABASE_NAME=postgres
POSTGRES_PASSWORD=postgres

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
/client/.env
```
CHALLENGE_URL=https://github.com/davi-silva/reonic-challenge
SERVER_URI=http://aws-ec2-instance-ip:5000
```
/server/.env
```
NODE_ENV=development
SERVER_NANE=Reonic Challenge
PORT=5000
CLIENT=http://aws-ec2-instance-ip:3000

DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=public"
```

### 5. Running Postgres on Docker
#### a. Install Docker and start docker service
```
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### b. Run Postgres container
```
sudo docker-compose up -d
```

### 6. Build and run both frontend and backend
#### a. Build and run frontend
```
cd client && npm run build
pm2 start npm --name "frontend" -- start
```
#### a. Build and run backend
```
cd server && npm run build
pm2 start npm --name "backend" -- start
```