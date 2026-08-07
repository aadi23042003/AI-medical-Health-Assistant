from django.shortcuts import render
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SymptomSerializer
from .predict import predict_full
class AnalyticsView(APIView):
    def post(self, request):
        data = request.data
        serializer = SymptomSerializer(data=data)
        data['symptoms'] = [s.lower() for s in data['symptoms']]
        result = [item.replace(" ", "_") for item in data['symptoms']]
        data['symptoms'] = result
        if serializer.is_valid():
            symptoms = serializer.validated_data['symptoms']
            result = predict_full(symptoms)
            return Response({"message": "Success", "symptoms": symptoms, "result": result}, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Create your views here.
