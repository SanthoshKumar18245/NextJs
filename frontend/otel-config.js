import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'; // gRPC-based OTLP exporter
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'; // gRPC-based metrics exporter
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

// Configure OTLP Trace Exporter
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317', // Replace with your OTLP collector URL
});

// Configure OTLP Metric Exporter
const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4317', // Replace with your OTLP collector URL
});

// Configure OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the OpenTelemetry SDK
try {
  sdk.start();
  console.log('OpenTelemetry SDK initialized successfully');
} catch (err) {
  console.error('Error initializing OpenTelemetry SDK', err);
}
