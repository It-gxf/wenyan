// This script generates lookup tables for the calendar library.
// Generated files:
//   lib/曆表.wy
//     The LUTs used by the standard calendar library.
//   tools/calendar.html
//     A table showing the first day of each month for checking.
//
// The tables in this script are auto-generated. Due to the use of low
// accuracy astronomical formula, calendar near the following days might be
// off by one day or one month.
//
// 1722401 (2018-11-08): maybe wrong 1st day of month (new moon at 1722401.0023)
// 1736606 (2057-09-29): maybe wrong 1st day of month (new moon at 1736606.0011)
// 1748269 (2089-09-04): maybe wrong 1st day of month (new moon at 1748270.0003)
// 1751164 (2097-08-08): maybe wrong 1st day of month (new moon at 1751164.0019)
// 1757572 (2115-02-24): maybe wrong 1st day of month (new moon at 1757573.0000)
// 1758015 (2116-05-12): maybe wrong 1st day of month (new moon at 1758016.0002)
// 1687201 (1922-06-25): maybe wrong leap month (solar term at 1687230.010, new moon at 1687230.8663)
// 1709998 (1984-11-23): maybe wrong leap month (solar term at 1710027.015, new moon at 1710027.8248)
// 1710973 (1987-07-26): maybe wrong leap month (solar term at 1711002.009, new moon at 1711002.8329)

try {
  process.chdir("./tools");
} catch (e) { } //make sure we're in tools directory

// totalDay of 1st of month #n = ceil(n * 25101 / 850 - 1) + monthFix(n)
// monthFix is tabulated below

// start index of the month start correction table
// update this value if the table is extended further into the past
const MONTH_FIX_START = 57105; // 1920

// month start correction table
// lists correction to the totalDay of 1st of each month
const MONTH_FIX_TABLE = [
  +1, +1, +1, +1, +0, +1, +0, +0, +0, -1, +0, +0,     // 1920
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 1921
  +1, +1, +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, // 1922
  +1, +0, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 1923
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +0, +1, +0,     // 1924
  +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, // 1925
  +1, +0, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1,     // 1926
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +1,     // 1927
  +1, +1, +1, +1, +0, +1, +0, +0, +0, -1, +0, +0, +1, // 1928
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 1929
  +1, +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, // 1930
  +0, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 1931
  +0, +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0,     // 1932
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +1, +1, +0, // 1933
  +0, +0, +0, +0, +0, +1, +0, +1, +0, +1, +1, +1,     // 1934
  +1, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +1,     // 1935
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +1, +1, // 1936
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1,     // 1937
  +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, // 1938
  +1, +1, +2, +1, +0, +1, +0, +0, +0, +0, +0, +0,     // 1939
  +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0,     // 1940
  +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, // 1941
  +0, +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0,     // 1942
  +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +0, +1,     // 1943
  +0, +1, +0, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, // 1944
  +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, +0,     // 1945
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0,     // 1946
  +1, +1, +2, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, // 1947
  +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0,     // 1948
  +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, // 1949
  +0, +0, +0, +1, +0, +1, +1, +1, +0, +1, +0, +1,     // 1950
  +0, +1, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0,     // 1951
  +1, +0, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +0, // 1952
  +1, +0, +1, +0, +0, +0, +1, +0, +1, +1, +0, +1,     // 1953
  +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1,     // 1954
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, // 1955
  +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +0,     // 1956
  +1, +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, // 1957
  +0, +0, +1, +1, +1, +1, +1, +0, +1, +0, +1, +0,     // 1958
  +1, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +1,     // 1959
  +0, +1, +0, +1, +0, +0, +1, +0, +1, +0, +1, +0, +1, // 1960
  +0, +1, +0, +1, +0, +1, +0, +1, +1, +0, +1, +0,     // 1961
  +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1,     // 1962
  +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, +1, // 1963
  +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +0, +1,     // 1964
  +1, +1, +1, +1, +1, +1, +0, +1, +0, -1, +0, +0,     // 1965
  +0, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +1, // 1966
  +0, +0, +1, +0, +1, +1, +1, +0, +1, +0, +1, +0,     // 1967
  +1, +0, +1, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, // 1968
  +1, +0, +1, +0, +1, +0, +1, +1, +0, +1, +0, +1,     // 1969
  +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1,     // 1970
  +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, +1, +1, // 1971
  +1, +1, +1, +0, +0, +0, +0, +0, +0, +0, +1, +0,     // 1972
  +1, +1, +1, +1, +1, +0, +1, +0, -1, +0, +0, +0,     // 1973
  +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +1, +0, // 1974
  +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 1975
  +0, +1, +1, +1, +1, +0, +1, +0, +1, +0, +0, +0, +0, // 1976
  +0, +1, +0, +1, +1, +1, +1, +0, +1, +0, +1, +0,     // 1977
  +0, +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +1,     // 1978
  +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1, +1, // 1979
  +1, +1, +1, +0, +0, +0, +0, +0, +0, +1, +0, +1,     // 1980
  +1, +1, +1, +1, +0, +1, +0, -1, +0, +0, +0, +0,     // 1981
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, // 1982
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 1983
  +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, // 1984
  +1, +0, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 1985
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +1, +0,     // 1986
  +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, // 1987
  +0, +1, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1,     // 1988
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +1,     // 1989
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +1, // 1990
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 1991
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 1992
  +1, +0, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, // 1993
  +0, +0, +1, +1, +1, +1, +1, +1, +1, +0, +0, +0,     // 1994
  +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +0, +1, +0, // 1995
  +1, +0, +0, +0, +0, +1, +0, +1, +0, +1, +1, +1,     // 1996
  +0, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +1,     // 1997
  +1, +1, +1, +0, +1, +0, +0, +0, +1, +0, +0, +1, +0, // 1998
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1,     // 1999
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 2000
  +0, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, // 2001
  +0, +1, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0,     // 2002
  +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0,     // 2003
  +1, +0, +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, // 2004
  +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +0, +1,     // 2005
  +0, +1, +0, +1, +0, +1, +0, +1, +0, +0, +1, +0, +1, // 2006
  +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, +1,     // 2007
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0,     // 2008
  +1, +1, +2, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, // 2009
  +1, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0,     // 2010
  +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, +1,     // 2011
  +0, +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +1, // 2012
  +0, +1, +0, +0, +0, +0, +1, +0, +1, +0, +1, +0,     // 2013
  +1, +0, +1, +0, +1, +0, +1, +0, +0, +1, +0, +1, +0, // 2014
  +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, +1, +1,     // 2015
  +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1,     // 2016
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, // 2017
  +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0,     // 2018
  +1, +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0,     // 2019
  +0, +0, +0, +1, +1, +1, +1, +1, +0, +1, +0, +1, +0, // 2020
  +1, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +1,     // 2021
  +0, +1, +0, +1, +0, +1, +1, +0, +1, +0, +1, +0,     // 2022
  +1, +0, +1, +0, +0, +0, +1, +0, +1, +1, +1, +1, +0, // 2023
  +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1,     // 2024
  +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, +1, // 2025
  +1, +1, +1, +1, +1, +0, +0, +0, -1, +0, +0, +1,     // 2026
  +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 2027
  +0, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +1, // 2028
  +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +0, +0,     // 2029
  +1, +0, +1, +0, +1, +1, +0, +1, +0, +1, +0, +1,     // 2030
  +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +1, +0, +1, // 2031
  +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1,     // 2032
  +1, +0, +1, +0, +0, +0, +0, +0, +0, +0, +1, +1, +1, // 2033
  +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +1, +0,     // 2034
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2035
  +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, // 2036
  +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 2037
  +0, +1, +1, +1, +1, +0, +1, +0, +1, +0, +0, +0,     // 2038
  +0, +0, +1, +0, +1, +1, +1, +1, +1, +1, +0, +1, +0, // 2039
  +0, +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +1,     // 2040
  +0, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1,     // 2041
  +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +1, +0, +1, // 2042
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0,     // 2043
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, // 2044
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2045
  +1, +1, +1, +1, +0, +1, +0, +1, +0, +0, +0, +0,     // 2046
  +0, +1, +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, // 2047
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1,     // 2048
  +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1, +1,     // 2049
  +1, +0, +1, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, // 2050
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0, +1,     // 2051
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, // 2052
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 2053
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2054
  +1, +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, // 2055
  +0, +0, +1, +1, +1, +1, +1, +1, +1, +0, +1, +0,     // 2056
  +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +0, +1,     // 2057
  +0, +1, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1, // 2058
  +0, +1, +0, +1, +0, +1, +0, +0, +0, +0, +1, +1,     // 2059
  +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1,     // 2060
  +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, // 2061
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 2062
  +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, // 2063
  +0, +1, +1, +1, +1, +1, +1, +1, +0, +1, +0, +0,     // 2064
  +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0,     // 2065
  +1, +0, +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, // 2066
  +1, +0, +1, +0, +1, +0, +0, +1, +0, +1, +0, +1,     // 2067
  +0, +1, +0, +1, +0, +0, +0, +1, +0, +1, +1, +0,     // 2068
  +1, +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, +1, // 2069
  +1, +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0,     // 2070
  +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +0, // 2071
  +1, +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0,     // 2072
  +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, +1,     // 2073
  +0, +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +1, // 2074
  +0, +1, +0, +1, +0, +0, +1, +0, +1, +0, +1, +0,     // 2075
  +1, +0, +1, +0, +1, +0, +1, +0, +1, +1, +0, +1,     // 2076
  +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +1, +1, +1, // 2077
  +0, +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1,     // 2078
  +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +0,     // 2079
  +1, +1, +1, +1, +1, +1, +1, +0, +1, +0, -1, +0, +0, // 2080
  +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0,     // 2081
  +0, +0, +0, +1, +1, +1, +0, +1, +0, +1, +0, +0, +0, // 2082
  +1, +0, +1, +1, +0, +1, +0, +1, +0, +1, +0, +1,     // 2083
  +0, +1, +0, +1, +0, +1, +1, +1, +1, +0, +1, +0,     // 2084
  +1, +0, +1, +0, +0, +0, +1, +0, +1, +1, +1, +1, +0, // 2085
  +1, +0, +1, +0, +0, +0, +0, +0, +1, +0, +1, +1,     // 2086
  +1, +1, +1, +1, +0, +0, +0, +0, +0, +0, +0, +1,     // 2087
  +1, +1, +1, +1, +1, +1, +0, +1, +0, -1, +0, +0, +1, // 2088
  +0, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0,     // 2089
  +0, +0, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +1, // 2090
  +0, +1, +1, +0, +1, +0, +1, +0, +1, +0, +0, +0,     // 2091
  +0, +0, +1, +0, +1, +1, +1, +1, +0, +1, +0, +1,     // 2092
  +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +1, +0, +1, // 2093
  +0, +0, +0, +0, +0, +0, +0, +1, +0, +1, +1, +1,     // 2094
  +1, +1, +1, +0, +0, +0, +0, +0, +0, +0, +1, +1,     // 2095
  +1, +1, +1, +1, +1, +0, +1, +0, -1, +0, +0, +1, +0, // 2096
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2097
  +0, +1, +1, +1, +1, +1, +0, +0, +0, +0, +0, +0,     // 2098
  +0, +1, +1, +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, // 2099
  +0, +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0,     // 2100
  +0, +0, +1, +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, // 2101
  +0, +0, +0, +0, +1, +0, +1, +0, +1, +1, +1, +1,     // 2102
  +1, +0, +0, +0, +0, +0, +0, +0, +0, +1, +1, +1,     // 2103
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, // 2104
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +0,     // 2105
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2106
  +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, // 2107
  +1, +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0,     // 2108
  +0, +1, +0, +1, +1, +1, +1, +1, +1, +0, +0, +0, +0, // 2109
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1,     // 2110
  +0, +0, +0, +0, +0, +0, +1, +0, +1, +0, +1, +1,     // 2111
  +1, +0, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +1, // 2112
  +1, +1, +1, +0, +1, +0, +0, +0, +1, +0, +0, +1,     // 2113
  +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1,     // 2114
  +1, +0, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0, +1, // 2115
  +1, +1, +1, +1, +1, +0, +1, +0, +0, +0, +0, +0,     // 2116
  +1, +0, +1, +1, +1, +1, +1, +1, +1, +0, +0, +0,     // 2117
  +0, +0, +0, +1, +0, +1, +1, +1, +1, +1, +0, +1, +0, // 2118
  +0, +0, +0, +1, +0, +1, +0, +1, +0, +1, +0, +1,     // 2119
  +0, +1, +0, +1, +0, +0, +0, +0, +1, +0, +1, +0, +1, // 2120
];


// totalMonth of leap month #n = ceil(n * 3157 / 94 - 27) + leapFix(n)
// leapFix is tabulated below

// start index of the leap month correction table
// update this value if the table is extended further into the past
const LEAP_FIX_START = 1701; // 1919-07

// leap month correction table
// lists correction to the totalMonth of each leap month
const LEAP_FIX_TABLE = [
  -3, // 1919-07
  -1, // 1922-05
  +1, // 1925-04
  +2, // 1928-02
  -2, // 1930-06
  +0, // 1933-05
  +2, // 1936-03
  -3, // 1938-07
  +0, // 1941-06
  +1, // 1944-04
  +2, // 1947-02
  -1, // 1949-07
  +0, // 1952-05
  +2, // 1955-03
  -2, // 1957-08
  -1, // 1960-06
  +1, // 1963-04
  +3, // 1966-03
  -1, // 1968-07
  +0, // 1971-05
  +3, // 1974-04
  -2, // 1976-08
  -1, // 1979-06
  +1, // 1982-04
  -2, // 1984-10
  -2, // 1987-06
  +0, // 1990-05
  +1, // 1993-03
  -2, // 1995-08
  -2, // 1998-05
  +1, // 2001-04
  +2, // 2004-02
  -1, // 2006-07
  +0, // 2009-05
  +2, // 2012-04
  -1, // 2014-09
  -1, // 2017-06
  +1, // 2020-04
  +2, // 2023-02
  -3, // 2025-06
  +0, // 2028-05
  +1, // 2031-03
  +1, // 2033-11
  -1, // 2036-06
  +1, // 2039-05
  +2, // 2042-02
  -2, // 2044-07
  +0, // 2047-05
  +1, // 2050-03
  -2, // 2052-08
  -1, // 2055-06
  +0, // 2058-04
  +3, // 2061-03
  -2, // 2063-07
  +0, // 2066-05
  +2, // 2069-04
  -3, // 2071-08
  -1, // 2074-06
  +0, // 2077-04
  +3, // 2080-03
  -2, // 2082-07
  +0, // 2085-05
  +2, // 2088-04
  -3, // 2090-08
  -1, // 2093-06
  +0, // 2096-04
  +2, // 2099-02
  -2, // 2101-07
  -1, // 2104-05
  +2, // 2107-04
  -2, // 2109-09
  -1, // 2112-06
  +0, // 2115-04
  +3, // 2118-03
  -2, // 2120-07
];


const WENYAN_HEAD = `注曰「「此文程式之作文也。勿施以修訂。」」
注曰「「程式書於文 tools/make_calendar.js 」」

`;

const getNumWord = function (n) {
  const NUM_CHARS = "〇一二三四五六七八九十";
  if (n < 0) {
    return "負" + getNumWord(-n);
  }
  let str = "";
  do {
    str = NUM_CHARS.charAt(n % 10) + str;
    n = Math.trunc(n / 10);
  } while (n > 0);
  return str;
};

const generateWenyan = function () {
  const ELEMS_PER_LINE = 20;
  let wy = WENYAN_HEAD;
  wy += `今有一數。曰${getNumWord(MONTH_FIX_START)}。名之曰「始曆月」。\n`;
  wy += "今有一列。名之曰「曆月表」。\n";
  wy += `今有一數。曰${getNumWord(LEAP_FIX_START)}。名之曰「始閏月」。\n`;
  wy += "今有一列。名之曰「閏月表」。\n";
  wy += "\n充「曆月表」。\n";
  for (let i = 0; i < MONTH_FIX_TABLE.length; ++i) {
    if (i === 0 || (i + MONTH_FIX_START) % ELEMS_PER_LINE === 0) {
      wy += "\t";
    }
    wy += `以${getNumWord(MONTH_FIX_TABLE[i])}`;
    if (i + 1 === MONTH_FIX_TABLE.length || (i + 1 + MONTH_FIX_START) % ELEMS_PER_LINE === 0) {
      wy += "。\n";
    }
  }
  wy += "\n充「閏月表」。\n";
  for (let i = 0; i < LEAP_FIX_TABLE.length; ++i) {
    if (i === 0 || (i + LEAP_FIX_START) % ELEMS_PER_LINE === 0) {
      wy += "\t";
    }
    wy += `以${getNumWord(LEAP_FIX_TABLE[i])}`;
    if (i + 1 === LEAP_FIX_TABLE.length || (i + 1 + LEAP_FIX_START) % ELEMS_PER_LINE === 0) {
      wy += "。\n";
    }
  }
  return wy;
};


const HTML_HEAD = `<!-- DOCTYPE html -->
<!-- Generated by make_calendar.js -->
<html>
<head>
  <meta charset="UTF-8">
  <title>Calendar</title>
  <style>
    table, th, td {
      border: solid 1px black;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.25em;
      text-align: center;
    }
    th {
      background-color: #ccc;
    }
    .even {
      background-color: #eee;
    }
    .odd {
      background-color: #fff;
    }
    .leap {
      background-color: #bdf;
    }
  </style>
</head>
<body>
  <table>
`;

const TABLE_HEAD = `    <tr>
      <th>年</th>
      <th>正月</th>
      <th>二月</th>
      <th>三月</th>
      <th>四月</th>
      <th>五月</th>
      <th>六月</th>
      <th>七月</th>
      <th>八月</th>
      <th>九月</th>
      <th>十月</th>
      <th>十一月</th>
      <th>十二月</th>
    </tr>
`;

const HTML_TAIL = `  </table>
</body>
</html>
`;

const CE_YEAR_OFFSET = 2697;

const getSexagenaryWord = function (n) {
  return "甲乙丙丁戊己庚辛壬癸".charAt((n - 1) % 10) + "子丑寅卯辰巳午未申酉戌亥".charAt((n - 1) % 12);
};

const getMonthBeginDay = function (totalMonth) {
  const index = totalMonth - MONTH_FIX_START;
  if (index < 0) {
    return -Infinity;
  } else if (index >= MONTH_FIX_TABLE.length) {
    return Infinity;
  } else {
    return Math.ceil(totalMonth * 25101 / 850 - 1) + MONTH_FIX_TABLE[index];
  }
};

const getLeapMonth = function (totalLeap) {
  const index = totalLeap - LEAP_FIX_START;
  if (index < 0) {
    return -Infinity;
  } else if (index >= LEAP_FIX_TABLE.length) {
    return Infinity;
  } else {
    return Math.ceil(totalLeap * 3157 / 94 - 27) + LEAP_FIX_TABLE[index];
  }
};

const getYearMonth = function (totalMonth) {
  let totalLeap = Math.round((totalMonth + 27) * 94 / 3157);
  const leapMonth = getLeapMonth(totalLeap);
  if (totalMonth < leapMonth) {
    --totalLeap;
  }
  const year = Math.floor((totalMonth - totalLeap) / 12);
  const month = (totalMonth - totalLeap) % 12 + 1;
  const isLeapMonth = totalMonth === leapMonth;
  return { year: year, month: month, isLeapMonth: isLeapMonth };
};

const getGregorianDay = function (totalDay) {
  const d = new Date((totalDay - 1704558) * 8.64e+7);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
};

const printYear = function (totalYear) {
  return `${totalYear - CE_YEAR_OFFSET}<br>${getSexagenaryWord(totalYear)}`;
};

const printMonth = function (totalMonth) {
  const fillZero = function (n, digits) {
    const s = n.toString();
    if (s.length >= digits) {
      return s;
    } else {
      return new Array(digits - s.length).fill("0") + s;
    }
  };
  const d = getMonthBeginDay(totalMonth);
  const g = getGregorianDay(d);
  return `${fillZero(g.month, 2)}-${fillZero(g.day, 2)} ${getSexagenaryWord(d)}`;
};

const getRowClass = function (totalYear) {
  return totalYear % 2 === 0 ? "odd" : "even";
}

const generateCalendar = function () {
  let prevMonth = getYearMonth(MONTH_FIX_START - 1);
  let currMonth = getYearMonth(MONTH_FIX_START);
  let prevLeapTotalMonth = null;
  let html = HTML_HEAD;
  html += TABLE_HEAD;
  html += `    <tr class="${getRowClass(currMonth.year)}">\n      <th rowspan="2">`;
  html += printYear(currMonth.year);
  html += '</th>\n';
  for (let i = 1; i < currMonth.month; ++i) {
    html += '      <td rowspan="2"></td>\n';
  }
  if (currMonth.isLeapMonth) {
    html += '      <td rowspan="1"></td>\n';
  }
  for (let i = 0; i < MONTH_FIX_TABLE.length; ++i) {
    const totalMonth = MONTH_FIX_START + i;
    const nextMonth = getYearMonth(totalMonth + 1);
    if (i !== 0 && currMonth.year !== prevMonth.year) {
      if (currMonth.year % 10 === 7) {
        html += TABLE_HEAD;
      }
      html += `    <tr class="${getRowClass(currMonth.year)}">\n      <th rowspan="2">`;
      html += printYear(currMonth.year);
      html += '</th>\n';
    }
    if (currMonth.isLeapMonth) {
      prevLeapTotalMonth = totalMonth;
    } else {
      if (nextMonth.isLeapMonth) {
        html += '      <td rowspan="1">';
      } else {
        html += '      <td rowspan="2">';
      }
      html += printMonth(totalMonth);
      html += '</td>\n';
    }
    if (nextMonth.year !== currMonth.year) {
      if (prevLeapTotalMonth !== null) {
        html += '    </tr>\n    <tr>\n      <td rowspan="1" class="leap">';
        html += printMonth(prevLeapTotalMonth);
        html += '</td>\n    </tr>\n';
        prevLeapTotalMonth = null;
      } else {
        html += '    </tr>\n    <tr></tr>\n';
      }
    }
    prevMonth = currMonth;
    currMonth = nextMonth;
  }
  if (currMonth.year === prevMonth.year) {
    for (let i = prevMonth.month + 1; i <= 12; ++i) {
      html += '      <td rowspan="2"></td>\n';
    }
    if (prevLeapTotalMonth !== null) {
      html += '    </tr>\n    <tr>\n      <td rowspan="1" class="leap">';
      html += printMonth(prevLeapTotalMonth);
      html += '</td>\n    </tr>\n';
    } else {
      html += '    </tr>\n    <tr></tr>\n';
    }
    html += '    </tr>\n';
  }
  html += HTML_TAIL;
  return html;
};

const fs = require("fs");
fs.writeFileSync("../lib/曆表.wy", generateWenyan());
fs.writeFileSync("./calendar.html", generateCalendar());