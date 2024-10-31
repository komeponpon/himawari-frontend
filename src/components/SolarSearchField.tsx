import { Box, Typography, Grid } from "@mui/material";
import BasicSelect from "./BasicSelect";
import { useState } from "react";

export default function SolarSearchField() {
  const [leaseCompany, setLeaseCompany] = useState<string>(""); //リース会社
  const [leasePeriod, setLeasePeriod] = useState<string>(""); //リース期間
  const [moduleModel, setModuleModel] = useState<string>(""); //モジュールモデル
  const [moduleCount, setModuleCount] = useState<string>(""); //モジュール枚数
  const [roofMaterial, setRoofMaterial] = useState<string>(""); //屋根材
  const [installationPoints, setInstallationPoints] = useState<string>(""); //施工
  const [totalModuleOutput, setTotalModuleOutput] = useState<number>(0); //モジュール合計出力
  const [applicationPowerOutput, setApplicationPowerOutput] = useState<string>(""); //申請出力
  const [monthlyLeaseFee, setMonthlyLeaseFee] = useState<number>(0); //月リース料
  const [totalLeaseAmount, setTotalLeaseAmount] = useState<number>(0); //総リース料

  const leaseCompanyOptions = [
    { value: "大阪ガスファイナンス", label: "大阪ガスファイナンス" },
    { value: "TEPCOフィンテック", label: "TEPCOフィンテック" }
  ];
  const leasePeriodOptions = [
    { value: "10年", label: "10年" },
    { value: "15年", label: "15年" }
  ];
  const moduleModelOptions = [
    { value: "SPR-MAX3-400", label: "maxeon 400W" },
    { value: "SS430M8GFH-18/VNH", label: "SI SOLAR 430W" }
  ];
  const roofMaterialOptions = [
    { value: "立平葺", label: "立平葺" },
    { value: "瓦葺", label: "瓦葺" }
  ];
  const installationPointsOptions = [
    { value: "6点", label: "6点" },
    { value: "8点", label: "8点" }
  ];
  const moduleCountOptions = Array.from({length: 33}, (_, i) => i + 8).map(num => ({
    value: num.toString(),
    label: `${num}枚`
  }));
  const applicationPowerOutputOptions = [
    { value: "3.2", label: "3.2kW" },
    { value: "3.6", label: "3.6kW" },
    { value: "4.0", label: "4.0kW" },
    { value: "5.9", label: "5.9kW" },
    { value: "8.0", label: "8.0kW" },
    { value: "9.9", label: "9.9kW" }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            リース会社
          </Typography>
          <BasicSelect
            options={leaseCompanyOptions}
            value={leaseCompany}
            onChange={setLeaseCompany}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            リース期間
          </Typography>
          <BasicSelect
            options={leasePeriodOptions}
            value={leasePeriod}
            onChange={setLeasePeriod}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            パネル種類
          </Typography>
          <BasicSelect
            options={moduleModelOptions}
            value={moduleModel}
            onChange={setModuleModel}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            パネル枚数
          </Typography>
          <BasicSelect
            options={moduleCountOptions}
            value={moduleCount}
            onChange={setModuleCount}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            申請出力
          </Typography>
          <BasicSelect
            options={applicationPowerOutputOptions}
            value={applicationPowerOutput}
            onChange={setApplicationPowerOutput}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            施工点数
          </Typography>
          <BasicSelect
            options={installationPointsOptions}
            value={installationPoints}
            onChange={setInstallationPoints}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            屋根材
          </Typography>
          <BasicSelect
            options={roofMaterialOptions}
            value={roofMaterial}
            onChange={setRoofMaterial}
          />
        </Grid>
      </Grid>
    </Box>
  );
}