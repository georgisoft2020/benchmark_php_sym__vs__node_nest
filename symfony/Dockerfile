FROM php:8.3-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony

# Copy composer files
COPY composer.json ./

# Install dependencies
RUN composer install --no-scripts --no-autoloader --no-dev

# Copy application files
COPY . .

# Finish Composer setup
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# Configure for production
RUN php bin/console cache:clear --env=prod

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public/"]