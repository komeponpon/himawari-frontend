import { Box, Typography, Grid, TextField } from "@mui/material";
import BasicSelect from "./BasicSelect";
import { useState } from "react";

export default function SolarSearchField() {
  const [leaseCompany, setLeaseCompany] = useState<string>(""); //リース会社
  const [leasePeriod, setLeasePeriod] = useState<string>(""); //リース期間
  const [moduleModel, setModuleModel] = useState<string>(""); //モジュールモデル
  const [moduleCount, setModuleCount] = useState<string>(""); //モジュール枚数
  const [roofMaterial, setRoofMaterial] = useState<string>(""); //屋根材
  const [installationPoints, setInstallationPoints] = useState<string>(""); //施工
  const [applicationPowerOutput, setApplicationPowerOutput] = useState<string>(""); //申請出力
  const [totalModuleOutputMin, setTotalModuleOutputMin] = useState<string>(""); // パネル出力最小値
  const [totalModuleOutputMax, setTotalModuleOutputMax] = useState<string>(""); // パネル出力最大値
  const [monthlyLeaseFeeMin, setMonthlyLeaseFeeMin] = useState<string>(""); // 月額リース料最小値
  const [monthlyLeaseFeeMax, setMonthlyLeaseFeeMax] = useState<string>(""); // 月額リース料最大値
  const [totalLeaseFeeMin, setTotalLeaseFeeMin] = useState<string>(""); // 総額リース料最小値
  const [totalLeaseFeeMax, setTotalLeaseFeeMax] = useState<string>(""); // 総額リース料最大値
  const [applicationCode, setApplicationCode] = useState<string>(""); // 申込コード
  const [monthlyLeaseFee10To15YearMin, setMonthlyLeaseFee10To15YearMin] = useState<string>("");
  const [monthlyLeaseFee10To15YearMax, setMonthlyLeaseFee10To15YearMax] = useState<string>("");

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
    { value: "スレート", label: "スレート" },
    { value: "瓦", label: "瓦" }
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
            パネル合計出力
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={totalModuleOutputMin}
              onChange={(e) => setTotalModuleOutputMin(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">kW</Typography>
              }}
              sx={{ 
                width: '45%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
            <Typography>~</Typography>
            <TextField
              size="small"
              type="number"
              value={totalModuleOutputMax}
              onChange={(e) => setTotalModuleOutputMax(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">kW</Typography>
              }}
              sx={{ 
                width: '45%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
          </Box>
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
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            リース料 月額1〜10年（税込）
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={monthlyLeaseFeeMin}
              onChange={(e) => setMonthlyLeaseFeeMin(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">円</Typography>
              }}
              sx={{ 
                width: '60%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
            <Typography>~</Typography>
            <TextField
              size="small"
              type="number"
              value={monthlyLeaseFeeMax}
              onChange={(e) => setMonthlyLeaseFeeMax(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">円</Typography>
              }}
              sx={{ 
                width: '60%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
          </Box>
        </Grid>
        {leasePeriod === "15年" && (
          <Grid item xs={3}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: 'bold',
                color: '#444'
              }}
            >
              リース料 月額10〜15年（税込）
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                size="small"
                type="number"
                value={monthlyLeaseFee10To15YearMin}
                onChange={(e) => setMonthlyLeaseFee10To15YearMin(e.target.value)}
                inputProps={{ min: "0" }}
                InputProps={{
                  endAdornment: <Typography variant="caption">円</Typography>
                }}
                sx={{ 
                  width: '60%',
                  '& .MuiInputBase-root': {
                    height: '56px'
                  }
                }}
              />
              <Typography>~</Typography>
              <TextField
                size="small"
                type="number"
                value={monthlyLeaseFee10To15YearMax}
                onChange={(e) => setMonthlyLeaseFee10To15YearMax(e.target.value)}
                inputProps={{ min: "0" }}
                InputProps={{
                  endAdornment: <Typography variant="caption">円</Typography>
                }}
                sx={{ 
                  width: '60%',
                  '& .MuiInputBase-root': {
                    height: '56px'
                  }
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
            }}
          >
            リース料 総額（税込）
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={totalLeaseFeeMin}
              onChange={(e) => setTotalLeaseFeeMin(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">円</Typography>
              }}
              sx={{ 
                width: '60%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
            <Typography>~</Typography>
            <TextField
              size="small"
              type="number"
              value={totalLeaseFeeMax}
              onChange={(e) => setTotalLeaseFeeMax(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: <Typography variant="caption">円</Typography>
              }}
              sx={{
                width: '60%',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
            />
          </Box>
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
            申込コード
          </Typography>
          <TextField
            size="small"
            value={applicationCode}
            onChange={(e) => setApplicationCode(e.target.value)}
            sx={{ 
              width: '100%',
              '& .MuiInputBase-root': {
                height: '56px'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}