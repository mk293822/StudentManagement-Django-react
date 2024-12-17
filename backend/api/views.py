from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializer import *
from django.utils import timezone

def event_delete():
    now = timezone.now()
    past = Event.objects.filter(date__lt = now)
    past.delete()

class PrincipalInfoView(APIView):
    
    def get(self, request):
        principals = PrincipalInfo.objects.all()
        serializer = PrincipalInfoSerializer(principals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PrincipalInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        principal = get_object_or_404(PrincipalInfo, id=request.data['id'])
        serializer = PrincipalInfoSerializer(principal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# StudentInfo API View
class StudentInfoView(APIView):
    def get(self, request):
        students = StudentInfo.objects.all()
        serializer = StudentInfoSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StudentInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        student = get_object_or_404(StudentInfo, id=request.data['id'])
        serializer = StudentInfoSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        student = get_object_or_404(StudentInfo, id=request.data['id'])
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ClassList API View
class ClassListView(APIView):
    def get(self, request):
        class_list = ClassList.objects.all()
        serializer = ClassListSerializer(class_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ClassListSerializer(data=request.data)
        if serializer.is_valid():
            class_instance = serializer.save()
            # Automatically create timetable entries for the new class
            for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']:
                TimeTable.objects.get_or_create(class_name=class_instance, day=day)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        class_list = get_object_or_404(ClassList, id=request.data['id'])
        serializer = ClassListSerializer(class_list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        class_list = get_object_or_404(ClassList, id=request.data['id'])
        class_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TeacherInfo API View
class TeacherInfoView(APIView):
    def get(self, request):
        teachers = TeacherInfo.objects.all()
        serializer = TeacherInfoSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TeacherInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        teacher = get_object_or_404(TeacherInfo, id=request.data['id'])
        serializer = TeacherInfoSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        teacher = get_object_or_404(TeacherInfo, id=request.data['id'])
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TimeTable API View
class TimeTableView(APIView):
    def get(self, request):
        time_table = TimeTable.objects.all()
        serializer = TimeTableSerializer(time_table, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        time_table = get_object_or_404(TimeTable, id=request.data['id'])
        serializer = TimeTableSerializer(time_table, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Event API View
class EventView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        event = get_object_or_404(Event, id=request.data['id'])
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        event = get_object_or_404(Event, id=request.data['id'])
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Attendance API View
class AttendanceView(APIView):
    def get(self, request):
        attendance = Attendance.objects.all()
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        attendance = get_object_or_404(Attendance, id=request.data['id'])
        serializer = AttendanceSerializer(attendance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        attendance = get_object_or_404(Attendance, id=request.data['id'])
        attendance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Grade API View
class GradeView(APIView):
    def get(self, request):
        grades = Grade.objects.all()
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        grade = get_object_or_404(Grade, id=request.data['id'])
        serializer = GradeSerializer(grade, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        grade = get_object_or_404(Grade, id=request.data['id'])
        grade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Overview API View
class OverviewView(APIView):
    event_delete()
    def get(self, request):
        overview = Overview.objects.all()
        serializer = OverViewSerializer(overview, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OverViewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        overview = get_object_or_404(Overview, id=request.data['id'])
        serializer = OverViewSerializer(overview, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        overview = get_object_or_404(Overview, id=request.data['id'])
        overview.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

