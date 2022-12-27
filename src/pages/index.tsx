import Head from 'next/head';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Table, Button, Form, Header, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  SemanticToastContainer,
  toast,
  ToastOptions,
} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Constants from '../common/constants';
import { OpenAQData, Measurement } from '../types/OpenAQData';

export const HomePage: FC<any> = ({}) => {
  const [openAQData, setOpenAQData] = useState<OpenAQData[]>([]);

  const getMeasurementsByCities = async (cities: string[]) => {
    const data: any[] = [];
    await fetch(
      `${Constants.OPENAQ_API_URL}/latest?limit=1&page=1&offset=0&sort=desc&radius=1000&city=${cities[0]}&order_by=lastUpdated&dumpRaw=false`,
    )
      .then((promise) => promise.json())
      .then((cityData) => {
        if (cityData.results.length > 0) {
          data.push(cityData);
        } else {
          data.push(null);
          const toastOps: ToastOptions = {
            title: `No data for '${cities[0]}'`,
            description: 'Please enter another value for City 1',
            time: 4000,
            icon: undefined,
            type: 'error',
          };
          toast(toastOps);
        }
      })
      .catch((err) => {
        const toastOps: ToastOptions = {
          title: `Issue fetching data for '${cities[0]}'`,
          description: err,
          time: 4000,
          icon: undefined,
          type: 'error',
        };
        toast(toastOps);
      });
    await fetch(
      `${Constants.OPENAQ_API_URL}/latest?limit=1&page=1&offset=0&sort=desc&radius=1000&city=${cities[1]}&order_by=lastUpdated&dumpRaw=false`,
    )
      .then((promise) => promise.json())
      .then((cityData) => {
        if (cityData.results.length > 0) {
          data.push(cityData);
        } else {
          data.push(null);
          const toastOps: ToastOptions = {
            title: `No data for '${cities[1]}'`,
            description: 'Please enter another value for City 2',
            time: 3000,
            icon: undefined,
            type: 'error',
          };
          toast(toastOps);
        }
      })
      .catch((err) => {
        const toastOps: ToastOptions = {
          title: `Issue fetching data for '${cities[1]}'`,
          description: err,
          time: 3000,
          icon: undefined,
          type: 'error',
        };
        toast(toastOps);
      });

    setOpenAQData(data);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const { target } = event;
    getMeasurementsByCities([target.city1.value, target.city2.value]);
  };

  return (
    <>
      <Head>
        <title>Air Quality Assessment Tool</title>
        <meta
          name="description"
          content="Tool used to compare Air Quality by cities"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          margin: '20px',
        }}
      >
        <Container textAlign="center">
          <SemanticToastContainer position="top-center" maxToasts={2} />
          <Header as="h1" textAlign="center">
            Welcome to the Air Quality Assessment Tool
          </Header>
          <Header as="h3" textAlign="center">
            Please enter 2 cities that you would like to compare
          </Header>
          <Divider hidden />
          <div style={{ margin: '10px' }}>
            <Form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <Form.Group widths="equal">
                <Form.Input
                  placeholder="City 1"
                  type="string"
                  label="City 1"
                  id="city1"
                  required
                  fluid
                />
                <Form.Input
                  placeholder="City 2"
                  type="string"
                  label="City 2"
                  id="city2"
                  required
                  fluid
                />
              </Form.Group>
              <Button type="submit" size="large">
                Submit
              </Button>
            </Form>
          </div>
          <Divider hidden />
          <div>
            {openAQData.length > 0 && (
              <Table celled columns={2}>
                <Table.Header>
                  <Table.Row>
                    {openAQData?.map((aq, i) => {
                      return (
                        <>
                          {aq && (
                            <Table.HeaderCell key={i}>
                              {aq.results[0].city} ({aq.results[0].location})
                            </Table.HeaderCell>
                          )}
                        </>
                      );
                    })}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    {openAQData?.map((aq, i) => {
                      return (
                        <>
                          {aq && (
                            <Table.Cell key={i}>
                              Coordinates: (Latitude :{' '}
                              {aq.results[0].coordinates
                                ? aq.results[0].coordinates.latitude
                                : 'No Data'}
                              , Longitude :{' '}
                              {aq.results[0].coordinates
                                ? aq.results[0].coordinates.longitude
                                : 'No Data'}
                              )
                            </Table.Cell>
                          )}
                        </>
                      );
                    })}
                  </Table.Row>
                  <Table.Row>
                    {openAQData?.map((aq, i) => {
                      return (
                        <>
                          {aq && (
                            <Table.Cell key={i}>
                              {aq.results[0].measurements.map(
                                (measurement: Measurement) => {
                                  return (
                                    <div key={measurement.value}>
                                      {measurement.value} {measurement.unit} of{' '}
                                      {measurement.parameter}
                                    </div>
                                  );
                                },
                              )}
                            </Table.Cell>
                          )}
                        </>
                      );
                    })}
                  </Table.Row>
                </Table.Body>
              </Table>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
