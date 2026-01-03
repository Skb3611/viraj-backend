import { prisma } from "../src/libs/prisma";
import { hashPassword } from "../src/libs/bcrypt";

async function main() {
  console.log("Start seeding ...");

  // Clean up database (delete in order of dependencies)
  await prisma.comment.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.citizen.deleteMany();
  await prisma.leader.deleteMany();

  const password = await hashPassword("password123");

  // Create Citizens
  const citizen1 = await prisma.citizen.create({
    data: {
      number: "9876543210",
      name: "Rahul Sharma",
      password: password,
      pincode: "400001",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
  });

  const citizen2 = await prisma.citizen.create({
    data: {
      number: "9876543211",
      name: "Priya Patel",
      password: password,
      pincode: "400001",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
  });

  console.log(`Created citizens: ${citizen1.name}, ${citizen2.name}`);

  // Create Leaders
  const leader1 = await prisma.leader.create({
    data: {
      number: "1122334455",
      name: "Vikram Singh",
      password: password,
      pincode: "400001",
      post: "MLA",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
  });

  const leader2 = await prisma.leader.create({
    data: {
      number: "5544332211",
      name: "Anjali Gupta",
      password: password,
      pincode: "400002",
      post: "Corporator",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    },
  });

  console.log(`Created leaders: ${leader1.name}, ${leader2.name}`);

  // Create Issues
  const issue1 = await prisma.issue.create({
    data: {
      title: "Broken Street Light",
      desc: "The street light near the main junction has been broken for 3 days. It's very dark at night.",
      pincode: "400001",
      status: "open",
      citizenId: citizen1.number,
      likes: 5,
    },
  });

  const issue2 = await prisma.issue.create({
    data: {
      title: "Garbage Pileup",
      desc: "Garbage has not been collected from sector 4 for the last week.",
      pincode: "400001",
      status: "inProgress",
      citizenId: citizen2.number,
      likes: 12,
    },
  });

  console.log(`Created issues: ${issue1.title}, ${issue2.title}`);

  // Create Bills
  const bill1 = await prisma.bill.create({
    data: {
      name: "Road Resurfacing Project",
      desc: "Allocating budget for resurfacing the main market road to fix potholes.",
      budget: "500000",
      leaderId: leader1.number,
      likes: 25,
    },
  });

  const bill2 = await prisma.bill.create({
    data: {
      name: "New Park Construction",
      desc: "Proposal to build a new community park in Sector 5.",
      budget: "1200000",
      leaderId: leader2.number,
      likes: 40,
    },
  });

  console.log(`Created bills: ${bill1.name}, ${bill2.name}`);

  // Create Comments
  await prisma.comment.create({
    data: {
      text: "This is a serious safety issue, please fix it soon!",
      issueId: issue1.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: "I agree, this needs immediate attention.",
      issueId: issue1.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: "Great initiative! The road really needs work.",
      billId: bill1.id,
    },
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
