"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_grpc_1 = require("@opentelemetry/exporter-trace-otlp-grpc");
const exporter_metrics_otlp_grpc_1 = require("@opentelemetry/exporter-metrics-otlp-grpc");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const sdk_metrics_1 = require("@opentelemetry/sdk-metrics");
const resources_1 = require("@opentelemetry/resources");
const traceExporter = new exporter_trace_otlp_grpc_1.OTLPTraceExporter({
    url: 'http://13.127.108.58:4317',
});
const metricExporter = new exporter_metrics_otlp_grpc_1.OTLPMetricExporter({
    url: 'http://13.127.108.58:4317',
});
const resource = new resources_1.Resource({
    'service.name': 'my-nestjs-backend',
    'service.version': '1.0.0',
    'service.instance.id': 'instance-1',
});
const sdk = new sdk_node_1.NodeSDK({
    resource,
    traceExporter,
    metricReader: new sdk_metrics_1.PeriodicExportingMetricReader({
        exporter: metricExporter,
    }),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
try {
    sdk.start();
    console.log('OpenTelemetry SDK initialized successfully');
}
catch (err) {
    console.error('Error initializing OpenTelemetry SDK', err);
}
//# sourceMappingURL=otel-config.js.map