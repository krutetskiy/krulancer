import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany();
  res.status(200).json(projects);
};

export default projects;
