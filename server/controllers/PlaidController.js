import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const createLinkToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Get the client_user_id by searching for the current user

  const user = await User.findOne({ email });

  const clientUserId = user._id.toString();

  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "Plaid Test App",
    products: ["auth", "transactions"],
    language: "en",
    // webhook: "https://webhook.example.com",
    // redirect_uri: "https://domainname.com/oauth-page.html",
    country_codes: ["US"],
  };

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(request);

    res.json({ link_token: createTokenResponse.data.link_token });
  } catch (error) {
    // handle error
    throw new Error(error.response.data.error_message);
  }
});

const exchangeToken = asyncHandler(async (req, res) => {
  const { email, publicToken } = req.body;

  const request = {
    public_token: publicToken,
  };

  try {
    const response = await plaidClient.itemPublicTokenExchange(request);
    const responseData = response.data;

    await User.findOneAndUpdate(
      { email: email },
      { access_token: response.data.access_token }
    );

    res.json(`Access token exchanged successfully}`);
  } catch (error) {
    console.log(error);
  }
});

const getTransactions = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  const access_token = user.access_token;

  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  try {
    const transactionResponse = await plaidClient.transactionsGet({
      access_token: access_token,
      start_date: startDate,
      end_date: endDate,
      options: { count: 10 },
    });

    // console.log(transactionResponse.data);

    res.json(transactionResponse.data);
  } catch (error) {
    throw new Error(error.response.data.error_message);
  }
});

export { createLinkToken, exchangeToken, getTransactions };
