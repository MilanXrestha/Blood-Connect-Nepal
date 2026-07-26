from django.core.management.base import BaseCommand
from api.models import BloodBank, User

class Command(BaseCommand):
    help = 'Seeds initial Nepali blood banks and demo donor stats for portfolio presentation'

    def handle(self, *args, **kwargs):
        blood_banks_data = [
            {
                "name": "Nepal Red Cross Society Central Blood Transfusion Service",
                "district": "Kathmandu",
                "address": "Exhibition Road, Bhrikutimandap, Kathmandu",
                "phone": "01-4225344",
                "emergency_contact": "9801025344",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Tribhuvan University Teaching Hospital (TUTH) Blood Bank",
                "district": "Kathmandu",
                "address": "Maharajgunj, Kathmandu",
                "phone": "01-4412404",
                "emergency_contact": "01-4412404 (Ext: 125)",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Patan Hospital Blood Bank (Red Cross)",
                "district": "Lalitpur",
                "address": "Lagankhel, Lalitpur",
                "phone": "01-5522266",
                "emergency_contact": "9841234567",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Pokhara Regional Red Cross Blood Transfusion Service",
                "district": "Pokhara",
                "address": "Ramghat, Pokhara",
                "phone": "061-521091",
                "emergency_contact": "061-521091",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Chitwan Red Cross Blood Bank",
                "district": "Chitwan",
                "address": "Bharatpur-10, Chitwan (Near Bharatpur Hospital)",
                "phone": "056-521199",
                "emergency_contact": "056-521199",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "BPKIHS Central Blood Bank",
                "district": "Dharan",
                "address": "Buddha Road, BPKIHS Campus, Dharan",
                "phone": "025-525555",
                "emergency_contact": "025-525555 (Ext: 2314)",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Biratnagar Red Cross Blood Bank",
                "district": "Biratnagar",
                "address": "Hospital Chowk, Biratnagar",
                "phone": "021-523326",
                "emergency_contact": "021-523326",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Lumbini Provincial Hospital Blood Bank",
                "district": "Butwal",
                "address": "Hospital Line, Butwal",
                "phone": "071-540199",
                "emergency_contact": "071-540199",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Bhaktapur Red Cross Blood Bank",
                "district": "Bhaktapur",
                "address": "Doodh Pati, Bhaktapur",
                "phone": "01-6611661",
                "emergency_contact": "01-6611661",
                "operating_hours": "6:00 AM - 8:00 PM",
                "is_24_hours": False
            },
            {
                "name": "Bheri Hospital Blood Transfusion Center",
                "district": "Nepalgunj",
                "address": "Bheri Hospital Campus, Nepalgunj",
                "phone": "081-520133",
                "emergency_contact": "081-520133",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            },
            {
                "name": "Narayani Hospital Blood Bank",
                "district": "Birgunj",
                "address": "Chhapkaiya, Birgunj",
                "phone": "051-522122",
                "emergency_contact": "051-522122",
                "operating_hours": "24/7 Emergency Service",
                "is_24_hours": True
            }
        ]

        created_banks = 0
        for bank_data in blood_banks_data:
            bank, created = BloodBank.objects.get_or_create(
                name=bank_data["name"],
                defaults=bank_data
            )
            if created:
                created_banks += 1

        # Seed demo donor donation counts if 0
        donors = User.objects.all()
        for idx, donor in enumerate(donors):
            if donor.donations_count == 0:
                donor.donations_count = (idx * 3 + 4) % 18
                donor.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_banks} Nepali blood banks and updated donor stats!'))
