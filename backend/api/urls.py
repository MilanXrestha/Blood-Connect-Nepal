from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import DonorViewSet, UserProfileView, RegisterView, BloodRequestViewSet, BloodBankViewSet, LeaderboardViewSet
from .analytics_views import AnalyticsView

router = DefaultRouter()
router.register(r'donors', DonorViewSet, basename='donor')
router.register(r'requests', BloodRequestViewSet, basename='bloodrequest')
router.register(r'blood-banks', BloodBankViewSet, basename='bloodbank')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('donors/me/', UserProfileView.as_view(), name='user_profile'),
    path('analytics/', AnalyticsView.as_view(), name='analytics'),
    path('', include(router.urls)),
]

