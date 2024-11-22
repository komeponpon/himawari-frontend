import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import BasicSelect from "./BasicSelect";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import BasicRadioButton from "./BasicRadioButton";
import { BasicButton } from "./BasicButton";
import SearchResultTable, { Column } from './SearchResultTable';
import axios from 'axios';
import * as XLSX from 'xlsx';
// レスポンスの型を定義
interface SolarSystemResponse {
  lease_company: string;
  lease_period: string;
  module_model: string;
  module_count: string;
  pcs_manufacturer: string;
  //pcs_model: string;
  //pcs_count: string;
  //pcs_model2: string | null;
  //pcs_count2: string | null;
  total_module_output: number;
  application_power_output: number;
  region: string;
  roof_material: string;
  installation_points: string;
  monthly_lease_fee_10: number | null;
  monthly_lease_fee_15: number | null;
  total_lease_amount: number;
  application_code: string;
}

export default function SolarSearchField() {
  const [leaseCompany, setLeaseCompany] = useState<string>(""); //リース会社
  const [leasePeriod, setLeasePeriod] = useState<string>(""); //リース期間
  const [moduleModel, setModuleModel] = useState<string>(""); //モジュールモデル
  const [moduleCount, setModuleCount] = useState<string>(""); //モジュール枚数
  const [pcsManufacturer, setPcsManufacturer] = useState<string>("デルタ電子"); //PCSメーカー
  //const [pcsModel, setPcsModel] = useState<string>(""); //PCSモデル
  //const [pcsCount, setPcsCount] = useState<string>(""); //PCS台数
  //const [pcsModel2, setPcsModel2] = useState<string | null>(null); //PCSモデル2
  //const [pcsCount2, setPcsCount2] = useState<string | null>(null); //PCS台数2
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
  const [region, setRegion] = useState<string>("通常"); // 対地域
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [installation, setInstallation] = useState<string>("false");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(rowId => rowId !== id)
    );
  };

  const handleExportExcel = () => {
    if (selectedRows.length === 0) {
      alert('エクスポートするデータを選択してください。');
      return;
    }

    const selectedData = searchResults.filter(row => 
      selectedRows.includes(row.applicationCode)
    );

    const worksheet = XLSX.utils.json_to_sheet(selectedData.map(row => ({
      'リース会社': row.leaseCompany,
      'リース期間': row.leasePeriod,
      'パネル種類': row.moduleModel,
      'パネル枚数': row.moduleCount,
      'パネル合計出力': `${row.totalModuleOutput}kW`,
      '申請出力': `${row.applicationPowerOutput}kW`,
      '対応地域': row.region,
      '屋根材': row.roofMaterial,
      '施工点数': row.installationPoints,
      '月額リース料(〜10年)': row.monthlyLeaseFee,
      '月額リース料(〜15年)': row.monthlyLeaseFee10To15Year,
      '総額リース料': row.totalLeaseFee,
      '申込コード': row.applicationCode,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '検索結果');
    XLSX.writeFile(workbook, '太陽光発電システム検索結果.xlsx');
  };

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
  const pcsManufacturerOptions = [
    { value: "デルタ電子", label: "無" },
    { value: "ダイヤゼブラ電機", label: "有" }
  ];
  const roofMaterialOptions = [
    { value: "立平葺", label: "立平葺" },
    { value: "スレート", label: "スレート" },
    { value: "横葺", label: "横葺" },
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
    { value: 3.2, label: "3.2kW" },
    { value: 3.6, label: "3.6kW" },
    { value: 4.0, label: "4.0kW" },
    { value: 5.9, label: "5.9kW" },
    { value: 8.0, label: "8.0kW" },
    { value: 9.9, label: "9.9kW" }
  ];
  const regionOptions = [
    { value: "通常", label: "通常" },
    { value: "多雪", label: "多雪" }
  ];
  const installationOptions = [
    { value: "false", label: "無" },
    { value: "true", label: "有" }
  ];

  const handleClear = () => {
    setLeaseCompany("");
    setLeasePeriod("");
    setModuleModel("");
    setModuleCount("");
    setPcsManufacturer("デルタ電子");
    setRoofMaterial("");
    setInstallationPoints("");
    setApplicationPowerOutput("");
    setTotalModuleOutputMin("");
    setTotalModuleOutputMax("");
    setMonthlyLeaseFeeMin("");
    setMonthlyLeaseFeeMax("");
    setTotalLeaseFeeMin("");
    setTotalLeaseFeeMax("");
    setApplicationCode("");
    setMonthlyLeaseFee10To15YearMin("");
    setMonthlyLeaseFee10To15YearMax("");
    setRegion("通常");
    setSearchResults([]);
    setInstallation("false");
    setSelectedRows([]);
  };

  const columns: Column[] = [
    { id: 'leaseCompany', label: 'リース会社', minWidth: 140, sortable: true },
    { id: 'leasePeriod', label: 'リース期間', minWidth: 100, sortable: true },
    //PCSメーカー
    { id: 'moduleModel', label: 'パネル種類', minWidth: 130, sortable: true },
    { id: 'moduleCount', label: 'パネル枚数', minWidth: 100, sortable: true },
    {
      id: 'totalModuleOutput',
      label: 'パネル合計出力',
      minWidth: 130,
      format: (value: number) => `${value}kW`,
      sortable: true
    },
    {
      id: 'applicationPowerOutput',
      label: '申請出力',
      minWidth: 100,
      format: (value: number) => `${value}kW`,
      sortable: true
    },
    { id: 'region', label: '対応地域', minWidth: 100, sortable: true },
    { id: 'roofMaterial', label: '屋根材', minWidth: 100, sortable: true },
    { id: 'installationPoints', label: '施工点数', minWidth: 100, sortable: true },
    {
      id: 'monthlyLeaseFee',
      label: '月額リース料（〜10年）',
      minWidth: 190,
      align: 'right',
      format: (value: number | null) => value ? `¥${value.toLocaleString('ja-JP')}` : '-',
      sortable: true
    },
    {
      id: 'monthlyLeaseFee10To15Year',
      label: '月額リース料（〜15年）',
      minWidth: 190,
      align: 'right',
      format: (value: number | null) => value ? `¥${value.toLocaleString('ja-JP')}` : '-',
      sortable: true
    },
    {
      id: 'totalLeaseFee',
      label: '総額リース料（税込）',
      minWidth: 180,
      align: 'right',
      format: (value: number) => `¥${value.toLocaleString('ja-JP')}`,
      sortable: true
    },
    { id: 'applicationCode', label: '申込コード', minWidth: 120, sortable: true }
  ];

  const handleSearch = async () => {
    try {
      const params: { [key: string]: string | boolean | undefined } = {
        lease_company: leaseCompany,
        lease_period: leasePeriod,
        module_model: moduleModel,
        module_count: moduleCount,
        pcs_manufacturer: pcsManufacturer,
        region: region,
        roof_material: roofMaterial,
        installation_points: installationPoints,
        application_power_output: applicationPowerOutput || undefined,
        total_module_output_min: totalModuleOutputMin || undefined,
        total_module_output_max: totalModuleOutputMax || undefined,
        monthly_lease_fee_min: monthlyLeaseFeeMin || undefined,
        monthly_lease_fee_max: monthlyLeaseFeeMax || undefined,
        monthly_lease_fee_10_to_15_year_min: monthlyLeaseFee10To15YearMin || undefined,
        monthly_lease_fee_10_to_15_year_max: monthlyLeaseFee10To15YearMax || undefined,
        total_lease_fee_min: totalLeaseFeeMin || undefined,
        total_lease_fee_max: totalLeaseFeeMax || undefined,
        application_code: applicationCode || undefined,
        installation: installation === "true",
      };

      console.log('Sending application_power_output:', params.application_power_output);

      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      console.log('Search parameters:', params);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/solar-systems/search`, {
        params: params
      });

      const formattedResults = (response.data as SolarSystemResponse[]).map((item) => ({
        leaseCompany: item.lease_company,
        leasePeriod: item.lease_period,
        moduleModel: item.module_model,
        moduleCount: item.module_count,
        pcsManufacturer: item.pcs_manufacturer,
        totalModuleOutput: item.total_module_output,
        applicationPowerOutput: item.application_power_output,
        region: item.region,
        roofMaterial: item.roof_material,
        installationPoints: item.installation_points,
        monthlyLeaseFee: item.monthly_lease_fee_10 ? Number(item.monthly_lease_fee_10) : null,
        monthlyLeaseFee10To15Year: item.monthly_lease_fee_15 ? Number(item.monthly_lease_fee_15) : null,
        totalLeaseFee: Number(item.total_lease_amount),
        applicationCode: item.application_code,
      }));

      setSearchResults(formattedResults);

      console.log('Formatted Results:', formattedResults);
    } catch (error: any) {
      if (error.response) {
        console.error('API Error Response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
        const errorMessage = error.response.data?.error || error.message;
        alert(`検索エラー: ${errorMessage}`);
      } else {
        console.error('Unexpected error:', error);
        alert('予期せぬエラーが発生しました');
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            対応地域
          </Typography>
          <BasicRadioButton
            label=""
            options={regionOptions}
            value={region}
            onChange={setRegion}
            row={true}
          />
        </Grid>
        {/*
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            施工
          </Typography>
          <BasicRadioButton
            label=""
            options={installationOptions}
            value={installation}
            onChange={setInstallation}
            row={true}
          />
        </Grid>
        */}
        {/*
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            ハイブリッド
          </Typography>
          <BasicRadioButton
            label=""
            options={pcsManufacturerOptions}
            value={pcsManufacturer}
            onChange={setPcsManufacturer}
            row={true}
          />
        </Grid>
        */}
        {/*
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
        */}
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
        <Grid item xs={3}>
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
                endAdornment: (
                  <>
                    {totalModuleOutputMin && (
                      <IconButton
                        size="small"
                        onClick={() => setTotalModuleOutputMin("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">kW</Typography>
                  </>
                )
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
                endAdornment: (
                  <>
                    {totalModuleOutputMax && (
                      <IconButton
                        size="small"
                        onClick={() => setTotalModuleOutputMax("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">kW</Typography>
                  </>
                )
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
            月額リース料（〜10年）
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={monthlyLeaseFeeMin}
              onChange={(e) => setMonthlyLeaseFeeMin(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: (
                  <>
                    {monthlyLeaseFeeMin && (
                      <IconButton
                        size="small"
                        onClick={() => setMonthlyLeaseFeeMin("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
                  </>
                )
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
                endAdornment: (
                  <>
                    {monthlyLeaseFeeMax && (
                      <IconButton
                        size="small"
                        onClick={() => setMonthlyLeaseFeeMax("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
                  </>
                )
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
              月額リース料（〜15年）
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                size="small"
                type="number"
                value={monthlyLeaseFee10To15YearMin}
                onChange={(e) => setMonthlyLeaseFee10To15YearMin(e.target.value)}
                inputProps={{ min: "0" }}
                InputProps={{
                  endAdornment: (
                    <>
                      {monthlyLeaseFee10To15YearMin && (
                        <IconButton
                          size="small"
                          onClick={() => setMonthlyLeaseFee10To15YearMin("")}
                          sx={{ p: 0.5, mr: 0.5 }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      <Typography variant="caption">円</Typography>
                    </>
                  )
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
                  endAdornment: (
                    <>
                      {monthlyLeaseFee10To15YearMax && (
                        <IconButton
                          size="small"
                          onClick={() => setMonthlyLeaseFee10To15YearMax("")}
                          sx={{ p: 0.5, mr: 0.5 }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      <Typography variant="caption">円</Typography>
                    </>
                  )
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
            リース料総額（税込）
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={totalLeaseFeeMin}
              onChange={(e) => setTotalLeaseFeeMin(e.target.value)}
              inputProps={{ min: "0" }}
              InputProps={{
                endAdornment: (
                  <>
                    {totalLeaseFeeMin && (
                      <IconButton
                        size="small"
                        onClick={() => setTotalLeaseFeeMin("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
                  </>
                )
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
                endAdornment: (
                  <>
                    {totalLeaseFeeMax && (
                      <IconButton
                        size="small"
                        onClick={() => setTotalLeaseFeeMax("")}
                        sx={{ p: 0.5, mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
                  </>
                )
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
            InputProps={{
              endAdornment: applicationCode && (
                <IconButton
                  size="small"
                  onClick={() => setApplicationCode("")}
                  sx={{ p: 0.5 }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )
            }}
            sx={{ 
              width: '100%',
              '& .MuiInputBase-root': {
                height: '56px'
              }
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mt: 10 }}>
        <BasicButton
          variant="contained"
          onClick={handleSearch}
          sx={{ 
            width: '200px',
            backgroundColor: '#F7B52C',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#FFC44D',
              boxShadow: 'none'
            }
          }}
        >
          検索
        </BasicButton>
        <BasicButton
          variant="outlined"
          onClick={handleClear}
          sx={{ 
            width: '200px',
            borderColor: '#F7B52C',
            color: '#F7B52C',
            '&:hover': {
              borderColor: '#FFC44D',
              color: '#FFC44D'
            }
          }}
        >
          クリア
        </BasicButton>
      </Box>
      {searchResults.length > 0 && (
        <>
          <Box sx={{
            paddingTop: '5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" component="h6">
              検索結果
            </Typography>
            <BasicButton
              variant="contained"
              onClick={handleExportExcel}
              disabled={selectedRows.length === 0}
              sx={{ 
                backgroundColor: '#F7B52C',
                boxShadow: 'none',
                '&:hover': {
                backgroundColor: '#FFC44D',
                boxShadow: 'none'
              }
            }}
          >
              エクスポート
            </BasicButton>
          </Box>
          <Box sx={{ mt: 4, width: '100%' }}>
            <SearchResultTable 
              columns={columns} 
              rows={searchResults}
              defaultRowsPerPage={10}
              rowsPerPageOptions={[10, 25, 100]}
              selectedRows={selectedRows}
              onSelectRow={handleRowSelect}
            />
          </Box>
        </>
      )}
    </Box>
  );
}