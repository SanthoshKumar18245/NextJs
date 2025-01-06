import { metricReader } from '../../otel-config';

export default async function handler(req, res) {
  try {
    // Collect metrics via the metricReader
    const metricsData = await metricReader.collect();

    const { resourceMetrics } = metricsData;

    if (!resourceMetrics) {
      throw new Error('No resource metrics available');
    }

    // Convert metrics to Prometheus-compatible text format
    const formattedMetrics = resourceMetrics
      .flatMap((resourceMetric) =>
        resourceMetric.scopeMetrics.flatMap((scopeMetric) =>
          scopeMetric.metrics.map((metric) => {
            const datapoints = metric.dataPoints
              .map((dp) => `${dp.value}`)
              .join('\n');
            return `${metric.descriptor.name} ${datapoints}`;
          })
        )
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(formattedMetrics);
  } catch (error) {
    console.error('Error exporting metrics:', error);
    res.status(500).send(`Error exporting metrics: ${error.message}`);
  }
}
