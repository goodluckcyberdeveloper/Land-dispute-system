from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
def register_user(request):

    user = User.objects.create_user (
        username=request.data['email'],
        email=request.data['email'],
        password=request.data['password'],
        full_name=request.data['full_name']
    )
    

    return Response({"message": "User created"})

@api_view(['POST'])
def login_user(request):

    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=400)

    user = authenticate(username=user_obj.username, password=password)

    if user is not None:
        return Response({
            "message": "Login success",
            "user_id": user.id,
            "role": user.role,
            "email": user.email
        })

    return Response({"message": "Invalid credentials"}, status=400)

@api_view(['POST'])
def forgot_password(request):

    email = request.data.get('email')

    try:
        User.objects.get(email=email)

        return Response({
            'message':
            'Email exists. Recovery code will be implemented.'
        })

    except User.DoesNotExist:

        return Response({
            'message': 'Email not found'
        })