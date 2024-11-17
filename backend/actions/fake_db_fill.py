from faker import Faker
from datetime import date, time, datetime, timedelta
from random import choice, randint, random, randrange
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_session
from typing import List

from api.v1.models import Candidate, Employee, Department
from core import db_helper

fake = Faker()

# Predefined lists for more realistic data
POSITIONS = [
    "Software Engineer",
    "Senior Developer",
    "Tech Lead",
    "Project Manager",
    "Product Manager",
    "DevOps Engineer",
    "QA Engineer",
    "Data Scientist",
    "Business Analyst",
    "UI/UX Designer",
    "System Architect",
    "Scrum Master",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
]

DEPARTMENTS = [
    "Engineering",
    "Product",
    "QA",
    "DevOps",
    "Data Science",
    "Design",
    "Research",
    "Infrastructure",
    "Mobile Development",
    "Web Development",
    "IT Support",
    "Security",
]

HARD_SKILLS = [
    "Python",
    "JavaScript",
    "SQL",
    "Java",
    "C++",
    "React",
    "Node.js",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "CI/CD",
    "TypeScript",
    "Go",
    "Rust",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "RabbitMQ",
    "FastAPI",
    "Django",
    "Flask",
]

SOFT_SKILLS = [
    "Communication",
    "Leadership",
    "Team Work",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Creativity",
    "Emotional Intelligence",
    "Conflict Resolution",
    "Negotiation",
    "Project Management",
    "Mentoring",
    "Public Speaking",
]


async def create_fake_departments(
    session: AsyncSession, num_departments: int = 10
) -> List[Department]:
    """
    Generate fake department data and save to database

    Args:
        session: SQLAlchemy session
        num_departments: Number of fake departments to create

    Returns:
        List of created Department instances
    """

    # List of realistic department names
    department_types = [
        "Human Resources",
        "Finance",
        "Marketing",
        "Sales",
        "Engineering",
        "Research & Development",
        "Customer Support",
        "Operations",
        "Legal",
        "Information Technology",
        "Product Management",
        "Quality Assurance",
        "Business Development",
        "Administration",
        "Public Relations",
    ]

    departments = []

    for _ in range(num_departments):
        # Generate a unique department name
        if department_types:
            # Pop a random department name to ensure uniqueness
            name = department_types.pop(randrange(len(department_types)))
        else:
            # If we run out of predefined names, generate a random one
            name = f"{fake.company()} Department"

        # Create a realistic department description
        description = fake.text(max_nb_chars=200)

        # Create new department
        department = Department(name=name, description=description)

        departments.append(department)
        session.add(department)

    # Commit the changes to the database
    await session.commit()

    return departments


#
# async def generate_random_candidates(
#     session: AsyncSession, num_candidates: int = 50
# ) -> List[Candidate]:
#     """Generate specified number of random candidates."""
#
#     candidates = []
#
#     # Calculate date ranges
#     max_birth_date = date.today() - timedelta(days=18 * 365)  # Minimum 18 years old
#     min_birth_date = date.today() - timedelta(days=65 * 365)  # Maximum 65 years old
#
#     for _ in range(num_candidates):
#         # Generate random birth date and time
#         birth_date = fake.date_between_dates(
#             date_start=min_birth_date, date_end=max_birth_date
#         )
#         birth_time = time(
#             hour=randint(0, 23), minute=randint(0, 59), second=randint(0, 59)
#         )
#
#         # Generate random skills
#         num_hard_skills = randint(3, 8)
#         num_soft_skills = randint(3, 6)
#
#         hard_skills = ", ".join(
#             sorted(set(choice(HARD_SKILLS) for _ in range(num_hard_skills)))
#         )
#         soft_skills = ", ".join(
#             sorted(set(choice(SOFT_SKILLS) for _ in range(num_soft_skills)))
#         )
#
#         # Generate bio
#         bio_paragraphs = randint(1, 3)
#         bio = "\n\n".join(fake.paragraph() for _ in range(bio_paragraphs))
#
#         # Create candidate
#         candidate = Candidate(
#             full_name=fake.name(),
#             birth_date=birth_date,
#             birth_time=birth_time,
#             hard_skills=hard_skills,
#             soft_skills=soft_skills,
#             bio=bio,
#             is_favoured=random() < 0.2,  # 20% chance of being favoured
#         )
#
#         candidates.append(candidate)
#         session.add(candidate)
#
#     # Commit in batches of 100
#     await session.commit()
#     return candidates


async def generate_random_employees(
    session: AsyncSession, num_employees: int = 30
) -> List[Employee]:
    """Generate specified number of random employees."""

    employees = []

    # Calculate date ranges
    max_birth_date = date.today() - timedelta(
        days=22 * 365
    )  # Minimum 22 years old for employees
    min_birth_date = date.today() - timedelta(days=60 * 365)  # Maximum 60 years old

    # Hire date range
    min_hire_date = date.today() - timedelta(days=10 * 365)  # Up to 10 years ago
    max_hire_date = date.today() - timedelta(days=30)  # At least 30 days ago

    for _ in range(num_employees):
        # Generate birth date and time
        birth_date = fake.date_between_dates(
            date_start=min_birth_date, date_end=max_birth_date
        )
        birth_time = time(
            hour=randint(0, 23), minute=randint(0, 59), second=randint(0, 59)
        )

        # Generate hire date (must be after birth date + 22 years)
        min_possible_hire = max(
            min_hire_date, date(birth_date.year + 22, birth_date.month, birth_date.day)
        )
        hire_date = fake.date_between_dates(
            date_start=min_possible_hire, date_end=max_hire_date
        )

        # Generate random skills
        num_hard_skills = randint(4, 10)  # Employees typically have more skills
        num_soft_skills = randint(4, 8)

        hard_skills = ", ".join(
            sorted(set(choice(HARD_SKILLS) for _ in range(num_hard_skills)))
        )
        soft_skills = ", ".join(
            sorted(set(choice(SOFT_SKILLS) for _ in range(num_soft_skills)))
        )

        # Generate position and department (ensuring they match)
        position = choice(POSITIONS)
        # Select appropriate department based on position

        # Generate bio focusing on professional experience
        bio_parts = [
            f"Professional {position} with {(date.today() - hire_date).days // 365} years of experience.",
            fake.paragraph(nb_sentences=3),
            f"Specializing in {', '.join(hard_skills.split(', ')[:3])}.",
            fake.paragraph(nb_sentences=2),
        ]
        bio = "\n\n".join(bio_parts)

        # Create employee
        employee = Employee(
            full_name=fake.name(),
            birth_date=birth_date,
            birth_time=birth_time,
            hard_skills=hard_skills,
            soft_skills=soft_skills,
            bio=bio,
            is_favoured=random() < 0.3,  # 30% chance of being favoured
            position=position,
            department_id=randint(1, 30),
            hire_date=hire_date,
        )

        employees.append(employee)
        session.add(employee)

    # Commit in batches
    await session.commit()
    return employees


async def main():
    """Main function to run the script."""

    # candidates = await generate_random_candidates(
    #     db_helper.get_scoped_session(), num_candidates=50
    # )
    #
    # print(f"Successfully generated {len(candidates)} candidates")
    #
    # # Print some sample data
    # sample_candidate = candidates[0]
    # print("\nSample candidate:")
    # print(f"Name: {sample_candidate.full_name}")
    # print(f"Birth: {sample_candidate.birth_date} {sample_candidate.birth_time}")
    # print(f"Hard Skills: {sample_candidate.hard_skills}")
    # print(f"Soft Skills: {sample_candidate.soft_skills}")
    # print(f"Is Favoured: {sample_candidate.is_favoured}")
    # print(f"Bio excerpt: {sample_candidate.bio[:100]}...")

    employees = await generate_random_employees(
        db_helper.get_scoped_session(), num_employees=30
    )
    # print(f"Successfully generated {len(employees)} employees")
    #
    # sample_employee = employees[0]
    # print("\nSample employee:")
    # print(f"Name: {sample_employee.full_name}")
    # print(f"Position: {sample_employee.position}")
    # print(f"Department: {sample_employee.department}")
    # print(f"Birth: {sample_employee.birth_date} {sample_employee.birth_time}")
    # print(f"Hire Date: {sample_employee.hire_date}")
    # print(f"Hard Skills: {sample_employee.hard_skills}")
    # print(f"Soft Skills: {sample_employee.soft_skills}")
    # print(f"Is Favoured: {sample_employee.is_favoured}")
    # print(f"Bio excerpt: {sample_employee.bio[:200]}...")
    # await create_fake_departments(db_helper.get_scoped_session(), num_departments=30)


if __name__ == "__main__":
    asyncio.run(main())
