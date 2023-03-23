import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import config from "../hch-config";

const radios = [
  {
    title: "Population",
    id: "populationRadio",
    value: "population",
  },
  {
    title: "Economy",
    id: "gdpRadio",
    value: "gdp",
  },
  {
    title: "GDP per capita",
    id: "gdpCapitaRadio",
    value: "gdpCapita",
  },
];

const Chart = (props) => {
  const [chartGroup, setChartGroup] = useState("population");
  const { records, filteredRecords, contextYear } = props;

  useEffect(() => {
    const recKeys = Object.keys(filteredRecords).length
      ? Object.keys(filteredRecords)
      : Object.keys(records);

    const series = [];

    for (let i = 0; i < recKeys.length; i++) {
      const rec = records[recKeys[i]];

      series.push({
        name: rec.name,
        data: [Number(rec[chartGroup][contextYear])],
      });

      if (i > 8) {
        break;
      }
    }
    
    config.series = series;
    Highcharts.chart(config);
  }, [records, filteredRecords, chartGroup]);

  return (
    <tbody>
      <tr>
        <td colSpan={5}>
          <form className="p-2 d-flex">
            <div className="input-group w-25">
              {radios.map((radio) => {
                return (
                  <div className="form-check" key={radio.value}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="chartRadio"
                      id={radio.id}
                      value={radio.value}
                      onChange={(e) => {
                        setChartGroup(e.target.value);
                      }}
                      checked={chartGroup === radio.value}
                    />
                    <label className="form-check-label me-3" htmlFor={radio.id}>
                      {radio.title}
                    </label>
                  </div>
                );
              })}
            </div>
          </form>
          <div id="charts-container" />
        </td>
      </tr>
    </tbody>
  );
};

const recordShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  extract: PropTypes.string.isRequired,
  population: PropTypes.objectOf(PropTypes.string.isRequired),
  gdp: PropTypes.objectOf(PropTypes.string.isRequired),
  gdpCapita: PropTypes.objectOf(PropTypes.string.isRequired),
});

Chart.propTypes = {
  contextYear: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  records: PropTypes.objectOf(recordShape),
  filteredRecords: PropTypes.objectOf(recordShape),
  viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    isFailed,
    records,
    filteredRecords,
    viewMode,
    contextYear,
  } = state.appReducer;

  return {
    isFetching,
    isFailed,
    records,
    viewMode,
    contextYear,
    filteredRecords,
  };
};

export default connect(mapStateToProps)(Chart);
