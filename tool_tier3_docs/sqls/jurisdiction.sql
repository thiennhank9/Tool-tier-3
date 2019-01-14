SELECT DISTINCT jalJurisdictionID AS JurisdictionID
	, customerno AS agencyID
	, agencyname AS agencyName
	, jalAgencyID AS ProviderID
	, provname AS providerName
FROM Jurisdictionaldb.nhomeadmin51.dbo.Agency a
INNER JOIN (
	SELECT jalParentID
		, jalJurisdictionID
		, min(jalAgencyID) AS jalAgencyID
	FROM Jurisdictionaldb.nhomeadmin51.dbo.JVAgencyLink
	GROUP BY jalJurisdictionID
		, jalParentID
	) AS agencyLink ON jalParentID = a.agencyID
INNER JOIN Jurisdictionaldb.nhomeDW51_CT.dbo.Admissions_Types ad ON ad.agencyID = a.agencyID
LEFT JOIN temp__providers ON jalAgencyID = provNumber
WHERE jalJurisdictionID = ?
	AND IsHold = 0
	AND IsLive = 1
	AND ad.TypeID IN (
		SELECT admitType
		FROM temp__admitTypes
		)a
ORDER BY provname
	, agencyname