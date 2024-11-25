import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import BasicSelect from "./BasicSelect";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { BasicButton } from "./BasicButton";
import BasicRadioButton from "./BasicRadioButton";
import SearchResultTable, { Column } from './SearchResultTable';
import axios from 'axios';
import * as XLSX from 'xlsx';

// レスポンスの型を定義
interface BatteryResponse {
  lease_company: string;
  lease_period: string;
  battery_manufacturer: string;
  model: string;
  capcity: number;
  quantity: number;
  total_capacity: number;
  monthly_lease_fee: number;
  total_lease_amount: number;
  customer_group: string;
  application_code: string;
  installation: boolean;
}

export default function BatterySearchField() {
  // 検索フィールドの状態管理
  const [leaseCompany, setLeaseCompany] = useState<string>("");
  const [leasePeriod, setLeasePeriod] = useState<string>("");
  const [batteryManufacturer, setBatteryManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [totalCapacityMin, setTotalCapacityMin] = useState<string>("");
  const [totalCapacityMax, setTotalCapacityMax] = useState<string>("");
  const [monthlyLeaseFeeMin, setMonthlyLeaseFeeMin] = useState<string>("");
  const [monthlyLeaseFeeMax, setMonthlyLeaseFeeMax] = useState<string>("");
  const [totalLeaseAmountMin, setTotalLeaseAmountMin] = useState<string>("");
  const [totalLeaseAmountMax, setTotalLeaseAmountMax] = useState<string>("");
  const [customerGroup, setCustomerGroup] = useState<string>("");
  const [applicationCode, setApplicationCode] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [installation, setInstallation] = useState<string>("false");

  // セレクトボックスのオプション定義
  const leaseCompanyOptions = [
    { value: "大阪ガスファイナンス", label: "大阪ガスファイナンス" },
    { value: "TEPCOフィンテック", label: "TEPCOフィンテック" }
  ];

  const leasePeriodOptions = [
    { value: "10年", label: "10年" },
    { value: "15年", label: "15年" }
  ];

  const batteryManufacturerOptions = [
    { value: "TESLA", label: "TESLA" },
    { value: "ダイヤゼブラ電機", label: "ダイヤゼブラ電機" }
  ];

  const customerGroupOptions = [
    { value: "一般", label: "一般" },
    { value: "法人", label: "法人" }
  ];

  const installationOptions = [
    { value: "false", label: "無" },
    { value: "true", label: "有" }
  ];

  // 行選択のハンドラー
  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(rowId => rowId !== id)
    );
  };

  // Excelエクスポートのハンドラー
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
      'バッテリーメーカー': row.batteryManufacturer,
      'モデル': row.model,
      '容量': `${row.capacity}kWh`,
      '数量': row.quantity,
      '総容量': `${row.totalCapacity}kWh`,
      '月額リース料': `¥${row.monthlyLeaseFee.toLocaleString()}`,
      'リース料総額': `¥${row.totalLeaseAmount.toLocaleString()}`,
      '顧客区分': row.customerGroup,
      '申込コード': row.applicationCode,
      '施工': row.installation ? '有' : '無'
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '検索結果');
    XLSX.writeFile(workbook, '蓄電池システム検索結果.xlsx');
  };

  // クリアボタンのハンドラー
  const handleClear = () => {
    setLeaseCompany("");
    setLeasePeriod("");
    setBatteryManufacturer("");
    setModel("");
    setCapacity("");
    setQuantity("");
    setTotalCapacityMin("");
    setTotalCapacityMax("");
    setMonthlyLeaseFeeMin("");
    setMonthlyLeaseFeeMax("");
    setTotalLeaseAmountMin("");
    setTotalLeaseAmountMax("");
    setCustomerGroup("");
    setApplicationCode("");
    setSearchResults([]);
    setSelectedRows([]);
    setInstallation("false");
  };

  // 検索ハンドラー
  const handleSearch = async () => {
    try {
      const params: { [key: string]: string | number | boolean | undefined } = {
        lease_company: leaseCompany,
        lease_period: leasePeriod,
        battery_manufacturer: batteryManufacturer,
        model: model,
        capacity: capacity || undefined,
        quantity: quantity ? Number(quantity) : undefined,
        total_capacity_min: totalCapacityMin || undefined,
        total_capacity_max: totalCapacityMax || undefined,
        monthly_lease_fee_min: monthlyLeaseFeeMin || undefined,
        monthly_lease_fee_max: monthlyLeaseFeeMax || undefined,
        total_lease_amount_min: totalLeaseAmountMin || undefined,
        total_lease_amount_max: totalLeaseAmountMax || undefined,
        customer_group: customerGroup,
        application_code: applicationCode,
        installation: installation === "true"
      };

      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/batteries/search`, {
        params: params
      });

      const formattedResults = (response.data as BatteryResponse[]).map((item) => ({
        leaseCompany: item.lease_company,
        leasePeriod: item.lease_period,
        batteryManufacturer: item.battery_manufacturer,
        model: item.model,
        capacity: item.capcity,
        quantity: item.quantity,
        totalCapacity: item.total_capacity,
        monthlyLeaseFee: item.monthly_lease_fee,
        totalLeaseAmount: item.total_lease_amount,
        customerGroup: item.customer_group,
        applicationCode: item.application_code,
        installation: item.installation
      }));

      setSearchResults(formattedResults);
    } catch (error: any) {
      if (error.response) {
        console.error('API Error:', error.response);
        alert(`検索エラー: ${error.response.data?.error || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('予期せぬエラーが発生しました');
      }
    }
  };

  // テーブルカラムの定義
  const columns: Column[] = [
    { id: 'leaseCompany', label: 'リース会社', minWidth: 140, align: 'left', sortable: true },
    { id: 'leasePeriod', label: 'リース期間', minWidth: 100, align: 'left', sortable: true },
    { id: 'batteryManufacturer', label: '蓄電池メーカー', minWidth: 160, align: 'left', sortable: true },
    { id: 'model', label: '型式', minWidth: 130, align: 'left', sortable: true },
    { id: 'capacity', label: '容量', minWidth: 100, align: 'right',
      format: (value: number) => `${value}kWh`, sortable: true },
    { id: 'quantity', label: '数量', minWidth: 80, align: 'right',
      format: (value: number) => value.toString(), sortable: true },
    { id: 'totalCapacity', label: '合計容量', minWidth: 100, align: 'right',
      format: (value: number) => `${value}kWh`, sortable: true },
    { id: 'monthlyLeaseFee', label: '月額リース料', minWidth: 130, align: 'right',
      format: (value: number) => `¥${value.toLocaleString()}`, sortable: true },
    { id: 'totalLeaseAmount', label: 'リース料総額', minWidth: 130, align: 'right',
      format: (value: number) => `¥${value.toLocaleString()}`, sortable: true },
    { id: 'applicationCode', label: '申込コード', minWidth: 130, align: 'center', sortable: true },
    { id: 'installation', label: '施工', minWidth: 110, align: 'left',
      format: (value: boolean) => value ? '有' : '無', sortable: true }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#444'
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

        <Grid item xs={2}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            リース会社
          </Typography>
          <BasicSelect
            options={leaseCompanyOptions}
            value={leaseCompany}
            onChange={setLeaseCompany}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            リース期間
          </Typography>
          <BasicSelect
            options={leasePeriodOptions}
            value={leasePeriod}
            onChange={setLeasePeriod}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            蓄電池メーカー
          </Typography>
          <BasicSelect
            options={batteryManufacturerOptions}
            value={batteryManufacturer}
            onChange={setBatteryManufacturer}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            総容量
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              inputProps={{ min: "0" }}
              value={totalCapacityMin}
              onChange={(e) => setTotalCapacityMin(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {totalCapacityMin && (
                      <IconButton size="small" onClick={() => setTotalCapacityMin("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">kWh</Typography>
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
              inputProps={{ min: "0" }}
              value={totalCapacityMax}
              onChange={(e) => setTotalCapacityMax(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {totalCapacityMax && (
                      <IconButton size="small" onClick={() => setTotalCapacityMax("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">kWh</Typography>
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

        <Grid item xs={3}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            月額リース料
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              inputProps={{ min: "0" }}
              value={monthlyLeaseFeeMin}
              onChange={(e) => setMonthlyLeaseFeeMin(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {monthlyLeaseFeeMin && (
                      <IconButton size="small" onClick={() => setMonthlyLeaseFeeMin("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
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
              inputProps={{ min: "0" }}
              value={monthlyLeaseFeeMax}
              onChange={(e) => setMonthlyLeaseFeeMax(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {monthlyLeaseFeeMax && (
                      <IconButton size="small" onClick={() => setMonthlyLeaseFeeMax("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
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

        <Grid item xs={3}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            リース料総額（税込）
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              inputProps={{ min: "0" }}
              value={totalLeaseAmountMin}
              onChange={(e) => setTotalLeaseAmountMin(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {totalLeaseAmountMin && (
                      <IconButton size="small" onClick={() => setTotalLeaseAmountMin("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
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
              inputProps={{ min: "0" }}
              value={totalLeaseAmountMax}
              onChange={(e) => setTotalLeaseAmountMax(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {totalLeaseAmountMax && (
                      <IconButton size="small" onClick={() => setTotalLeaseAmountMax("")} sx={{ p: 0.5, mr: 0.5 }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography variant="caption">円</Typography>
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
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#444' }}>
            申込コード
          </Typography>
          <TextField
            size="small"
            value={applicationCode}
            onChange={(e) => setApplicationCode(e.target.value)}
            InputProps={{
              endAdornment: applicationCode && (
                <IconButton size="small" onClick={() => setApplicationCode("")} sx={{ p: 0.5 }}>
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