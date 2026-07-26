from rest_framework import viewsets, permissions, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, BloodRequest, BloodBank
from .serializers import UserSerializer, BloodRequestSerializer, BloodBankSerializer

class DonorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all available donors. Allows searching by blood_group and district.
    """
    queryset = User.objects.filter(is_available=True)
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['blood_group', 'district']
    search_fields = ['username', 'district', 'blood_group']

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get or update the profile of the currently logged in user.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    """
    Register a new donor.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class BloodRequestViewSet(viewsets.ModelViewSet):
    """
    CRUD for urgent blood requests.
    """
    queryset = BloodRequest.objects.all().order_by('-created_at')
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['blood_group', 'district', 'is_fulfilled']

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

class BloodBankViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List verified blood banks across Nepal with district filtering and search.
    """
    queryset = BloodBank.objects.all().order_by('name')
    serializer_class = BloodBankSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['district', 'is_24_hours']
    search_fields = ['name', 'address', 'district']

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns top donors ranked by total verified blood donations.
    """
    queryset = User.objects.filter(donations_count__gt=0).order_by('-donations_count')[:20]
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

