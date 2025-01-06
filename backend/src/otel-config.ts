import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'; // gRPC-based OTLP exporter
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'; // gRPC-based metrics exporter
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';

// Configure OTLP Trace Exporter
const traceExporter = new OTLPTraceExporter({
  url: 'http://13.127.108.58:4317', // Replace with your OTLP collector URL
});

// Configure OTLP Metric Exporter
const metricExporter = new OTLPMetricExporter({
  url: 'http://13.127.108.58:4317', // Replace with your OTLP collector URL
});

// Define a Resource for the service name
const resource = new Resource({
  'service.name': 'my-nestjs-backend', // Replace with your service name
  'service.version': '1.0.0',         // Optional: Add service version
  'service.instance.id': 'instance-1', // Optional: Add instance ID
});

// Configure OpenTelemetry SDK
const sdk = new NodeSDK({
  resource,
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
