import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const categories = [
  "Salary",
  "Freelancing",
  "Donation",
  "Miscellaneous",
  "Others",
];

const IncomeForm = () => {
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const income = { amount, date, category, description };
    try {
      const token = Cookies.get("token"); // retrieve token from cookie
      console.log(token);
      const response = await axios.post(
        "http://localhost:3700/api/v1/add-income",
        income,
        {
          headers: {
            Authorization: `Bearer ${token}`, // include token in authorization header
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Income added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAmount("");
        setDate("");
        setCategory("");
        setDescription("");
      } else {
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="amount" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>

        <FormControl id="date" isRequired mt={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="category" isRequired mt={4}>
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          mt={4}
          mx="auto"
          display="block"
        >
          Add Income
        </Button>
      </form>
    </Box>
  );
};

export default IncomeForm;
