import { getOAuth2Client } from "./google";

export interface GbpMetrics {
  impressions: number;
  websiteClicks: number;
  callClicks: number;
  directionRequests: number;
}

export async function getGbpMetrics(
  startDate: string,
  endDate: string
): Promise<GbpMetrics | null> {
  const auth = getOAuth2Client();
  if (!auth || !process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_GBP_LOCATION_ID)
    return null;

  try {
    const { google } = await import("googleapis");
    const businessProfile = google.businessprofileperformance({
      version: "v1",
      auth,
    });

    const locationName = `locations/${process.env.GOOGLE_GBP_LOCATION_ID}`;

    const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

    const response =
      await businessProfile.locations.fetchMultiDailyMetricsTimeSeries({
        location: locationName,
        dailyMetrics: [
          "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
          "BUSINESS_IMPRESSIONS_MOBILE_MAPS",
          "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
          "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
          "WEBSITE_CLICKS",
          "CALL_CLICKS",
          "BUSINESS_DIRECTION_REQUESTS",
        ],
        "dailyRange.startDate.year": startYear,
        "dailyRange.startDate.month": startMonth,
        "dailyRange.startDate.day": startDay,
        "dailyRange.endDate.year": endYear,
        "dailyRange.endDate.month": endMonth,
        "dailyRange.endDate.day": endDay,
      });

    const timeSeries = response.data.multiDailyMetricTimeSeries || [];
    let impressions = 0;
    let websiteClicks = 0;
    let callClicks = 0;
    let directionRequests = 0;

    for (const series of timeSeries) {
      const dailyMetricTimeSeries =
        series.dailyMetricTimeSeries || [];

      for (const metric of dailyMetricTimeSeries) {
        const metricName = metric.dailyMetric || "";
        const dataPoints = metric.timeSeries?.datedValues || [];

        const total = dataPoints.reduce(
          (sum: number, dp: { value?: string | null }) =>
            sum + parseInt(dp.value || "0", 10),
          0
        );

        if (
          metricName.includes("IMPRESSIONS")
        ) {
          impressions += total;
        } else if (metricName === "WEBSITE_CLICKS") {
          websiteClicks += total;
        } else if (metricName === "CALL_CLICKS") {
          callClicks += total;
        } else if (metricName === "BUSINESS_DIRECTION_REQUESTS") {
          directionRequests += total;
        }
      }
    }

    return { impressions, websiteClicks, callClicks, directionRequests };
  } catch (e) {
    console.error("GBP metrics error (non-fatal):", e);
    return null;
  }
}
