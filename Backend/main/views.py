from django.shortcuts import render
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SymptomSerializer

class AnalyticsView(APIView):
    def post(self, request):
        data = request.data
        data['symptoms'] = [s.lower() for s in data['symptoms']]
        result = [item.replace(" ", "_") for item in data['symptoms']]
        data['symptoms'] = result
        print(data)
        serializer = SymptomSerializer(data=data)

        if serializer.is_valid():
            symptoms = serializer.validated_data['symptoms']
            return Response({"message": "Success", "symptoms": symptoms}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Create your views here.
