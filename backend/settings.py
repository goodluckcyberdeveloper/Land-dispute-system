import os
from pathlib import Path
import dj_database_url

# BASE DIRECTORY
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

DEBUG = False

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".onrender.com"
]

# APPLICATIONS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # REST framework
    'rest_framework',
    'rest_framework_simplejwt',
    
    # CORS
    'corsheaders',
    
    # your apps
    'users',
    'disputes',
    'tracking',
    'notifications',
    'locations',
]

# MIDDLEWARE
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS
CORS_ALLOW_ALL_ORIGINS = True

# ROOT URL
ROOT_URLCONF = 'backend.urls'

# TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI
WSGI_APPLICATION = 'backend.wsgi.application'

# DATABASE (RENDER POSTGRES)
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get(
            "DATABASE_URL",
            "postgresql://land_dispute_db_user:ntslOzZ5OhXKgzzPfT0bSdCBwU9jc6CZ@dpg-d915v9km0tmc73eauipg-a.frankfurt-postgres.render.com/land_dispute_db"
        )
    )
}

# AUTH USER MODEL
AUTH_USER_MODEL = 'users.User'

# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# LANGUAGE / TIME
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True
USE_TZ = True

# STATIC FILES (RENDER)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# DEFAULT AUTO FIELD
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'