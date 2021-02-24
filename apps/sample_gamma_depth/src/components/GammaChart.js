import { useRef, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getUnitDisplay } from '@corva/ui/utils';

import { getConvertedValue, getGammaChartArray } from '../utils/dataProcessing';

const getChartOptions = ({
  data,
  measuredDepthMin,
  measuredDepthMax,
  gammaRayMin,
  gammaRayMax,
}) => {
  return {
    chart: {
      zoomType: 'xy',
      type: 'spline',
      plotBackgroundColor: 'rgb(39,39,39)',
      plotBackgroundImage: null,
      backgroundColor: null,
    },
    title: {
      text: 'Sample Gamma Depth',
      align: 'left',

      style: {
        color: '#9E9E9E',
        fontSize: '12px',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(32, 31, 31, 0.85)',
      borderColor: 'rgba(32, 31, 31, 0.85)',
      style: {
        color: '#BDBDBD',
      },
    },
    credits: false,
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    yAxis: {
      min: gammaRayMin,
      max: gammaRayMax,
      gridLineWidth: 1,
      gridLineColor: 'rgb(65, 65, 65)',
      lineColor: 'rgb(65,65,65)',
      title: {
        style: {
          color: 'rgb(158,158,158)',
          fontSize: '14px',
        },
        text: `Gamma Ray (api)`,
      },
    },
    xAxis: {
      min: getConvertedValue(measuredDepthMin),
      max: getConvertedValue(measuredDepthMax),
      gridLineWidth: 1,
      gridLineColor: 'rgb(65,65,65)',
      tickInterval: 1,
      lineColor: 'rgb(65,65,65)',
      tickLength: 0,
      title: {
        style: {
          color: 'rgb(158,158,158)',
          fontSize: '14px',
        },
        text: `Measured Depth, ${getUnitDisplay('length')}`,
      },
    },

    legend: {
      itemStyle: {
        color: 'rgb(158,158,158)',
      },
      itemHoverStyle: {
        color: 'rgb(255,255,255)',
      },
    },
    plotOptions: {
      spline: {
        crisp: true,
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data: getGammaChartArray(data),
        color: '#3EC35F',
        name: 'Gamma Ray',
      },
    ],
  };
};

const GammaChart = ({ coordinates, data, scaleSettings }) => {
  const { measuredDepthMin, measuredDepthMax, gammaRayMin, gammaRayMax } = scaleSettings;
  const chartRef = useRef(null);
  const chartContainerProps = { style: { height: '100%', width: '100%' } };
  useEffect(() => {
    // NOTE: Update chart size when container size has changed
    if (chartRef.current) chartRef.current.chart.setSize();
  }, [coordinates.w, coordinates.h, coordinates.pixelWidth]);

  return useMemo(() => {
    const options = getChartOptions({
      data,
      measuredDepthMin,
      measuredDepthMax,
      gammaRayMin,
      gammaRayMax,
    });
    return (
      options && (
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          containerProps={chartContainerProps}
        />
      )
    );
  }, [data, measuredDepthMin, measuredDepthMax, gammaRayMin, gammaRayMax]);
};

export default GammaChart;
