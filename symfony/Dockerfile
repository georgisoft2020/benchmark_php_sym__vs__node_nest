FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip curl libzip-dev libpq-dev libxml2-dev libonig-dev libicu-dev \
    && docker-php-ext-install pdo pdo_mysql zip opcache intl

# Opcache config for performance (file stats disabled)
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.revalidate_freq=0" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=16" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=10000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.fast_shutdown=1" >> /usr/local/etc/php/conf.d/opcache.ini

# Composer install
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy entire source code first
COPY . .

# Install Composer dependencies (prod only)
RUN composer install --no-dev --optimize-autoloader --classmap-authoritative --no-interaction

# Pre-warm Symfony cache
RUN php bin/console cache:clear --env=prod && \
    php bin/console cache:warmup --env=prod


RUN mkdir -p /var/www/html/var/cache

# Fix permissions
RUN chown -R www-data:www-data var
RUN chown -R www-data:www-data /var/www/html/var
RUN chmod -R 775 /var/www/html/var

CMD ["php-fpm"]