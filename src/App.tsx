import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Button,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image
} from "@chakra-ui/react";
import React from "react";
import "./styles.css";
interface IGift {
  name: string;
  count: number;
  img: string;
}
//Apartir del 11 se empieza a descomponer este archivo en componentes.
export default function App() {
  const Init = () => {
    const giftLocal = window.localStorage.getItem("gifts");
    if (giftLocal !== null) return JSON.parse(giftLocal);
    return [];
  };
  const [gifts, setGifts] = React.useState<IGift[]>(Init());
  //Dia 12 se agregar el ID.
  const [value, setValue] = React.useState<IGift>({
    name: "",
    count: 1,
    img: ""
  });
  React.useEffect(() => {
    window.localStorage.setItem("gifts", JSON.stringify(gifts));
  }, [gifts]);

  const addGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      value.name.length >= 1 &&
      gifts.every((aux) => aux.name !== value.name) &&
      value.img.length > 5
    ) {
      setGifts((prev) => [...prev, value]);
      setValue({ name: "", count: 1, img: "" });
    }
  };
  const deleteGift = (aux: string) => {
    let filter;
    filter = gifts.filter((gift) => gift.name !== aux);
    setGifts(filter);
  };
  const deleteAllGifts = () => {
    setGifts([]);
  };
  return (
    <>
      <Box>
        <Container>
          <Stack
            gap={10}
            justifyContent="center"
            alignItems="center"
            minH="100vh"
          >
            <Heading textAlign="center">Gifts(10)</Heading>
            <Stack border="2px" p={5} rounded="lg" minW={320}>
              <Text
                _hover={{ color: "blackAlpha.500", cursor: "pointer" }}
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                onClick={deleteAllGifts}
              >
                Clear
              </Text>
              {gifts.map((gift) => (
                <Stack
                  key={gift.name}
                  isInline
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Image
                    rounded="full"
                    boxSize="50px"
                    objectFit="cover"
                    src={gift.img}
                    alt={gift.name}
                    borderColor={"blackAlpha.500"}
                    border={"2px"}
                  />
                  <Text textTransform="capitalize" fontWeight="semibold">
                    {"- " + gift.name}
                  </Text>
                  <Text textTransform="capitalize" fontWeight="semibold">
                    {gift.count}
                  </Text>
                  <Button onClick={() => deleteGift(gift.name)} size={"xs"}>
                    X
                  </Button>
                </Stack>
              ))}
            </Stack>
            <Stack
              border="2px"
              p={5}
              rounded="lg"
              minW={320}
              justifyContent="space-between"
              as={"form"}
              onSubmit={addGift}
            >
              <Stack isInline alignItems="center">
                <FormLabel htmlFor="gift">New</FormLabel>
                <FormControl>
                  <Input
                    value={value.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue({ ...value, name: e.target.value })
                    }
                    id="gift"
                    type="text"
                    placeholder={"Enter a Gift"}
                    variant="flushed"
                  />
                </FormControl>
                <NumberInput
                  value={value.count}
                  onChange={(data: string) =>
                    setValue({ ...value, count: Number(data) })
                  }
                  defaultValue={1}
                  min={1}
                  max={20}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
              <Stack isInline alignItems="center">
                <FormLabel htmlFor="img">Image</FormLabel>
                <FormControl>
                  <Input
                    value={value.img}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue({ ...value, img: e.target.value })
                    }
                    id="img"
                    type="text"
                    placeholder={"Enter a URL"}
                    variant="flushed"
                  />
                </FormControl>
                <Button type="submit">Add</Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
