import { Spacer } from "@nextui-org/spacer";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

export default function Jurnal() {
  return (
    <div className="w-full flex flex-col pt-36 pb-32">
      <h1 className="text-center font-bold text-3xl tracking-wide">Jurnal</h1>
      <Spacer y={8} />
      <div className="flex flex-col items-center gap-y-6">
        {[1, 2, 3, 4, 5].map((e, i) => (
          <Card key={i} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">NextUI</p>
                <p className="text-small text-default-500">nextui.org</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}