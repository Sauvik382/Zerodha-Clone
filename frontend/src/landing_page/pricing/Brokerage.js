import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="text-muted"
          >
            <li>
              Call & Trade and RMS auto-squareoff incur an extra fee of 50
              rupees plus GST for each order.
            </li>
            <li>Digital contract notes are delivered through email.</li>
            <li>
              Physical copies of contract notes cost 20 rupees per note if
              requested, plus applicable courier fees.
            </li>
            <li>
              Non-PIS NRI accounts are charged 0.5% or 100 rupees per executed
              equity order, whichever is less.
            </li>
            <li>
              PIS NRI accounts are billed at 0.5% or 200 rupees per executed
              equity order, whichever is lower.
            </li>
            <li>
              Accounts in a debit balance incur a higher charge of 40 rupees per
              executed order instead of the standard 20 rupees.
            </li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
